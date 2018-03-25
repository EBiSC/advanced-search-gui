import { observable, computed, action } from "mobx"
import { VARIANT, GENE } from "./Constants"
import Variant from "./Variant"
import Gene from "./Gene"
import consequences from "./consequences.json"
import { EGAAuthenticationURL, GeneOntologyURL } from "./Config"

export class Store {

  // Query
  @observable searchText = ""
  @observable loading = false
  @observable results = false
  @observable deferredQuery = false
  @observable savedQuery = ""

  //Variant
  @observable variantStart = ""
  @observable variantEnd = ""
  @observable variantRegion = ""

  // Authentication
  @observable username = ""
  @observable password = ""
  @observable authError = ""
  @observable accessToken = ""

  // Autocomplete - SearchBox
  @observable autocompleteArray = []
  // Placeholder Text - SearchBox
  @observable placeholderText = "using RsID, HGVS or Gene Symbols"

  // Form - Variant Consequences
  @observable consequenceAutocompleteArray = consequences
  @observable selectedConsequence = this.consequenceAutocompleteArray[0]

  // Form - Zygosity
  @observable zygosity = "All"
  @observable zygosityToggle = true

  // Form - Allele Frequency (MAF)
  @observable allelefreq = 0.05
  @observable allelefreqToggle = false

  //Dialog
  @observable dialog = { title: "", content: "" }

  // Catch user input type
  @observable inputType = ""

  @action
  getInputType = async () => {
    // Check for Gene Symbol 
    if (this.searchText.length >= 2) {
      let response = await this.fetchStuff(GeneOntologyURL + this.searchText);
      if (response.response.numFound !== 0) {
        this.autocompleteArray = response.response.docs.map(x => x.label)
        this.inputType = "Gene Symbol"
      }
    }

    //Check for rsID
    if (this.searchText.trim().match(/^rs\d+$/)) {
      this.inputType = "dbSNP"
      return
    }
    // Check for HGVS 
    if (this.searchText.trim().match(/^([^ :]+):.*?([cgmrp]?)\.?([*\-0-9]+.[^ ]*)/)) {
      this.inputType = "HGVS"
      return
    }
  }

  @computed
  get inputCategory() {
    if (this.inputType === "dbSNP" || this.inputType === "HGVS") return VARIANT
    if (this.inputType === "GO" || this.inputType === "Gene Symbol") return GENE
    return "Dunno category :("
  }

  @action
  resetFields = () => {
    if (this.searchText.trim().length < 3)
      this.autocompleteArray = []
    this.selectedConsequence = ""
    this.results = false
  }

  @action
  fetchStuff = (url) => {
    try {
      return fetch(url).then(x => x.json())
    } catch (e) {
      // Handle Error as you like
    }
  }

  @action
  sendRequest = () => {
    if (this.inputCategory === "Variant") {
      Variant.name = this.searchText.trim()
      Variant.getCellLineFromVariant()
    }
    if (this.inputType === "Gene Symbol" || this.inputType === "GO") {
      Gene.getCellLine()
    }
  }

  @action
  copied() {
    this.dialog.title = "URL Copied!"
  }

  @action
  authenticate = () => {
    this.loading = true
    fetch(EGAAuthenticationURL, {
      body: `grant_type=password&client_id=0b54fa73-8124-4c59-93a3-aed7f96d85ae&client_secret=B_aEAR_HaL2fgjhXUdt1z6Oq2dv-lCDfTsmQ9SINxGpVDaA8MKJKwc9r2NBFP0dSWYgZ52RaYwY0ADlYvMLNyw&username=${this.username}&password=${this.password}&scope=openid`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    }).then(x => x.json()).then(x => {
      this.loading = false
      if (x.access_token) {
        this.accessToken = x.access_token
        localStorage["aqs_token"] = x.access_token
        localStorage["aqs_time"] = new Date()
        if (this.deferredQuery) {
          this.sendRequest()
          this.deferredQuery = false
        }
        // Logout after 3500 seconds!
        setTimeout(() => { this.accessToken = "" }, 3500 * 1000)
      }
      else if (x.error) {
        this.dialog.title = "Error"
        this.dialog.content = x.error_description
      }
    })
  }
  // Download Results as .CSV
  @action
  CSVDownload() {
    if (this.results) {
      const Json2csvParser = require('json2csv').Parser
      const fields = ['location', 'cellname', 'celltype', 'disease', 'zygosity', 'externalurl']
      let rows = []
      this.results.map(variant => {
        variant.genotypes.map(x => {
          let row = {
            location: variant.seq_region_name + ":" + variant.start,
            cellname: x.cell_line.name,
            celltype: x.cell_line.primary_cell_type.name,
            disease: x.cell_line.primary_disease.name,
            zygosity: x.genotype,
            externalurl: `https://cells.ebisc.org/${x.cell_line.name}/`
          }
          rows.push(row)
          return false
        })
        return false
      })
      const json2csvParser = new Json2csvParser({ fields })
      const csv = json2csvParser.parse(rows)
      var downloadLink = document.createElement("a")
      var blob = new Blob(["\ufeff", csv])
      var url = URL.createObjectURL(blob)
      downloadLink.href = url
      downloadLink.download = "export.csv"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }

  // Prepares the query object for htsget service
  @computed
  get query() {
    if (this.inputCategory === VARIANT) {
      return {
        "token": this.accessToken,
        "start": this.variantStart,
        "end": this.variantEnd,
        "seq_region_name": this.variantRegion
      }
    }
    else if (this.inputCategory === GENE) {
      return {
        "variants": {
          "token": this.accessToken
        },
        "genome": "homo_sapiens",
        "name": this.searchText.trim()
      }
    }
  }

  // Prepares the field object for htsget service
  @computed
  get fields() {
    if (this.inputCategory === VARIANT)
      return ["*"]
    if (this.inputCategory === GENE)
      return [
        "name",
        {
          "variants": [
            "seq_region_name",
            "start", "allele_freq", "ref_allele", "alt_allele",
            {
              "genotypes": ["id", "genotype", "cell_line"]
            }
          ]
        }
      ]
  }

  // Returns the authentication status
  @computed
  get authenticated() {
    if (this.accessToken === "")
      return false
    else return true
  }
}
export default new Store()
