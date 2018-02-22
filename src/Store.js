import { observable, computed, action } from "mobx"
import { VARIANT, GENE } from "./Constants"

export class Store {
  @observable searchText = ""
  @observable loading = false
  @observable results = false

  // Authentication
  @observable username = ""
  @observable password = ""
  @observable authenticated = false

  //Location
  @observable location = ""

  // Autocomplete - SearchBox
  @observable autocompleteArray = []
  // Placeholder Text - SearchBox
  @observable placeholderText = "RsID or HGVS or Gene Symbol or GO ID or RefSeq"

  // Form - Variant Consequences
  @observable selectedConsequence = ""
  // Autocomplete - Variant Consequences
  @observable consequenceAutocompleteArray = []

  // Form - Zygosity
  @observable zygosity = ""
  @observable zygosityToggle = true

  // Form - Allele Frequency (MAF)
  @observable allelefreq = 5
  @observable alleleToggle = true

  // Chip 
  @observable inputType = "Start typing for an appropriate form"

  //SNACKBAR
  @observable snackbar = false
  @observable snackbarText = "This will take you to the HIPSCI/EBISC website in the final product."

  // HELPER
  getRsIDs = () => {
    //http://rest.ensembl.org/variation/human/rs56116432?content-type=application/json
    this.fetchStuff(`http://rest.ensembl.org/variation/human/${this.searchText}?content-type=application/json`).then(x => {
      if (x.mappings) {
        this.location = x.mappings[0].location
      }
    })
  }

  getHGVS = () => {
    //SAMD9:c.2054G>A
    /*
    this.fetchStuff(`http://rest.ensembl.org/variation/human/${this.searchText}?content-type=application/json`).then(x => {
      if (x.mappings) {
        this.location = x.mappings[0].location
      }
    })
    */

  }
  //HELPERS END

  @action
  getInputType = async () => {

    //Check for GO Terms
    if (this.searchText.toUpperCase().indexOf("GO:") === 0) {
      this.fetchGoSuggest()
      this.inputType = "GO"
      return
    }

    //Check for rsID
    if (this.searchText.trim().match(/^rs\d+$/)) {
      this.getRsIDs();
      this.inputType = "dbSNP"
      return
    }

    // Check for HGVS 
    if (this.searchText.trim().match(/^([^ :]+):.*?([cgmrp]?)\.?([*\-0-9]+.[^ ]*)/)) {
      this.getHGVS();
      this.inputType = "HGVS"
      return
    }

    // Check for Gene Symbol 
    if (this.searchText.length >= 2) {
      let response = await this.fetchStuff("https://www.ebi.ac.uk/ols/api/select?ontology=ogg&q=" + this.searchText);
      if (response.response.numFound !== 0) {
        this.autocompleteArray = response.response.docs.map(x => x.label);
        this.inputType = "Gene Symbol";
        return
      }
    }
  }

  @computed
  get inputCategory() {
    if (this.inputType === "dbSNP" || this.inputType === "HGVS") return VARIANT
    if (this.inputType === "GO" || this.inputType === "Gene Symbol") return GENE
    return "Dunno category :(";
  }

  @action
  sendRequest = () => {
    let newstate = this;
    newstate.loading = true;
    setTimeout(function () {
      newstate.loading = false;
      newstate.results = true;
    }, 1200);
  }

  @action
  fetchVariantConsequences = () => {
    this.fetchStuff(
      "https://rest.ensembl.org/info/variation/consequence_types?content-type=application/json"
    ).then(x => {
      x.push({ SO_term: "loss of function" })
      x = x.map(x => x.SO_term)
      x = x
        .join()
        .replace(/_/g, " ")
        .split(",")
      this.consequenceAutocompleteArray = x
    });
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
    this.zygosity = ""
    this.selectedConsequence = ""
    this.results = false
  }

  @action
  fetchStuff = (url) => {
    try {
      return fetch(url).then(x => x.json())
    } catch (e) {
      console.log("Error", e)
    }
  }


  @action
  authenticate = async () => {
    this.loading = true
    let url = 'http://eu.httpbin.org/basic-auth/user/passwd'
    const CORSANYWHERE = "https://cors-anywhere.herokuapp.com/"
    console.log("Authenticating", this.username, this.password)
    url = CORSANYWHERE + `https://ega.ebi.ac.uk/ega/rest/access/v2/users/${this.username}?pass=${this.password}`
    fetch(url).then(x => x.json()).then(x => {
      console.log(x)
      if (x.header && x.header.errorCode === "200")
        this.authenticated = true
      else
        alert("Unauthorized")
      this.loading = false
    })
  }
}

export default new Store()
