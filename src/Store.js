import { observable, computed, action } from "mobx";
class Store {
  @observable searchText = "";
  @observable loading = false;
  @observable results = false;
  @observable selectedSpecies = {};
  @observable autocompleteArray = [];
  @observable consequenceAutocompleteArray = [];
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
  //Animation
  @observable slideIndex = 0;
  @observable transforms = ["translateY(120px)", "translateX(1400px)"];
  @observable transformDefaults = ["translateY(0)", "translateX(0)"];
  //Animation Ends
  @observable userSelection = "VARIANT";
  @observable zygosity = "";
  @observable alleleToggle = true;
  @observable allelefreq = 5;
  @observable inputType = "";

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
    return "reererre";
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
    let state = this;
    state.loading = true;
    state.inputType = "";
    setTimeout(function() {
      state.loading = false;
      state.results = true;
    }, 1200);
  }

  @action
  fetchStuff(url) {
    return fetch(url).then(x => x.json());
  }

  @computed
  get getOpacity() {
    console.log("SLIDE INDEX", this.slideIndex);
    var arr = [0.35, 0.35, 0.35];
    arr.splice(this.slideIndex, 1, 1);
    console.log(arr);
    return arr;
  }
}

let store = new Store();
export default store;
