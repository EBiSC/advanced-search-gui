import React, { Component } from "react";
import { observer } from "mobx-react";
import Transition from "react-transition-group/Transition";
import Store from "./Store";
import Styles from "./Styles";
import SearchBox from "./searchBox";
import VariantForm from "./VariantForm";
import Results from "./Results";
import GeneForm from "./GeneForm";
import Snackbar from "./SnackBar";
import Transitions from "./Transitions";
import Chip from "./Chip";

@observer
class EBISC extends Component {
  componentDidMount() {
    //Load Variant Consequences
    Store.fetchVariantConsequences();
  }

  render() {
    return (
      <div>
        {/* Error Reporting */}
        <Snackbar />
        {/* Autocomplete SearchBox */}
        <SearchBox />
        <Chip />
        <div style={Styles.positionRelative}>
          <Transitions
            form="VariantForm"
            if={
              Store.inputCategory === "Variant" && !Store.results ? true : false
            }
          />
          <Transitions
            form="GeneForm"
            if={
              Store.inputCategory === "Genes" && !Store.results ? true : false
            }
          />
          <Transitions form="Results" if={Store.results ? true : false} />
        </div>
      </div>
    );
  }
}
export default EBISC;
