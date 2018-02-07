import { observable, computed, action } from "mobx";
class Store {
  @observable searchText = "";
  @observable loading = false;
  @observable results = false;
  @observable GeneView = false;
  @observable selectedConsequence = "";
  @observable selectedSpecies = {};
  @observable autocompleteArray = [];
  @observable consequenceAutocompleteArray = [];
  @observable userSelection = "VARIANT";
  @observable zygosity = "";
  @observable alleleToggle = true;
  @observable zygosityToggle = true;
  @observable allelefreq = 5;
  @observable inputType = "";
  //AUTHENTICATION
  @observable username = "";
  @observable password = "";
  //PLACEHOLDER
  @observable
  placeholderTexts = [
    "RsID or HGVS or Gene Symbol or GO ID or RefSeq",
    "HIPSCI Cell Line"
  ];
  //DROPDOWN
  @observable dropdown = 1;
  //snackbar
  @observable snackbar = false;
  @observable snackbarText = "This will take you to the HIPSCI/EBISC website in the final product.";
  //Animation
  @observable slideIndex = 0;
  @observable transforms = ["translateY(120px)", "translateX(1400px)"];
  @observable transformDefaults = ["translateY(0)", "translateX(0)"];
  //Animation Ends

  @computed
  get appearTransform() {
    if (this.inputType === "") return this.transforms[0];
    if (this.loading) return this.transforms[1];
  }
  get appearTransformDefault() {
    if (this.inputType === "") return this.transformDefaults[0];
    if (this.loading) return this.transformDefaults[1];
  }
  @computed
  get placeholder() {
    return this.placeholderTexts[this.dropdown - 1];
  }
  @computed
  get inputCategory() {
    if (this.inputType === "dbSNP" || this.inputType === "HGVS") {
      return "Variant";
    }
    if (this.inputType === "HIPSCI" || this.inputType === "EBISC") {
      return "Cell Lines";
    }
    if (
      this.inputType === "GO" ||
      this.inputType === "Gene Symbol" ||
      this.inputType === "RefSeq"
    ) {
      return "Genes";
    }
    return "Dunno category :(";
  }

  @action
  proceed() {
    console.log("PROCEEDING");
    if (this.slideIndex < 2) this.slideIndex += 1;
    else {
      this.slideIndex = 0;
    }
  }
  @action
  sendRequest() {
    let newstate = this;
    newstate.loading = true;
    setTimeout(function () {
      newstate.loading = false;
      newstate.results = true;
    }, 1200);
  }

  @action
  fetchVariantConsequences() {
    this.fetchStuff(
      "https://rest.ensembl.org/info/variation/consequence_types?content-type=application/json"
    ).then(x => {
      x.push({ SO_term: "loss of function" });
      x = x.map(x => x.SO_term);
      x = x
        .join()
        .replace(/_/g, " ")
        .split(",");
      this.consequenceAutocompleteArray = x;
    });
  }

  @action
  fetchGoSuggest = () => {
    this.fetchStuff(
      "https://www.ebi.ac.uk/ols/api/select?ontology=go&q=" + this.searchText
    ).then(x => {
      this.autocompleteArray = x.response.docs.map(
        x => x.obo_id + " " + x.label
      );
    });
  }

  @action
  fetchGeneSuggest = () => {
    fetch("https://www.ebi.ac.uk/ols/api/select?ontology=ogg&q=" + this.searchText)
      .then(x => x.json())
      .then(x => {
        if (x.response.numFound !== 0) {
          this.autocompleteArray = x.response.docs.map(x => x.label);
          this.inputType = "Gene Symbol";
        }
      });
  }
  @action
  resetFields = () => {
    // Put in Store
    this.inputType = "";
    this.zygosity = "";
    this.selectedConsequence = "";
    this.results = false;
  }

  @action
  fetchStuff = (url) => {
    return fetch(url).then(x => x.json());
  }
}

let store = new Store();
export default store;
