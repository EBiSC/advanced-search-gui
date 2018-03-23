import { observable, computed, action } from "mobx"
import { VARIANT, GENE } from "./Constants"
import Variant from "./Variant"
import Gene from "./Gene"
import consequences from "./consequences.json"
const EGAAuthenticationURL = "https://ega.ebi.ac.uk:8443/ega-openid-connect-server/token"

export class Store {

  @observable searchText = ""
  @observable searchError = ""
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
  @observable placeholderText = "using RsID, HGVS, Gene Symbols or GO ID"

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

  // Chip 
  @observable inputType = "Start typing for an appropriate form"

  //SNACKBAR
  @observable snackbar = false
  @observable snackbarText = "This will take you to the HIPSCI/EBISC website in the final product."

  @action
  getInputType = async () => {
    // Check for Gene Symbol 
    if (this.searchText.length >= 2) {
      let response = await this.fetchStuff("https://www.ebi.ac.uk/ols/api/select?ontology=ogg&q=" + this.searchText);
      if (response.response.numFound !== 0) {
        this.autocompleteArray = response.response.docs.map(x => x.label)
        this.inputType = "Gene Symbol"
      }
    }

    //Check for GO Terms
    if (this.searchText.toUpperCase().indexOf("GO:") === 0) {
      this.fetchGoSuggest()
      this.inputType = "GO"
      return
    }
    //Check for rsID
    if (this.searchText.trim().match(/^rs\d+$/)) {
      this.inputType = "dbSNP"
      return
    }
    // Check for HGVS 
    if (this.searchText.trim().match(/^([^ :]+):.*?([cgmrp]?)\.?([*\-0-9]+.[^ ]*)/)) {
      //this.getHGVS();
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

  fetchGoSuggest = () => {
    this.fetchStuff(
      "https://www.ebi.ac.uk/ols/api/select?ontology=go&q=" + this.searchText
    ).then(x => {
      this.autocompleteArray = x.response.docs.map(
        x => x.obo_id + " " + x.label
      )
    })
  }

  @action
  resetFields = () => {
    if (this.searchText.trim().length < 3)
      this.autocompleteArray = []
    this.selectedConsequence = ""
    this.results = false
    this.searchError = ""
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
    if (this.inputType === "Gene Symbol") {
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
        // ("SGCG:c.1-6638T>C")
        // Logout after 3500 seconds!
        setTimeout(() => { this.accessToken = "" }, 3500 * 1000)
      }
      else if (x.error) {
        this.dialog.title = "Error"
        this.dialog.content = x.error_description
      }
    })
  }

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

  @computed
  get authenticated() {
    if (this.accessToken === "")
      return false
    else return true
  }
}
export default new Store()
