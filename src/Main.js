import React, { Component } from "react";
import { observer } from "mobx-react";
import Store from "./Store";
import Styles from "./UI/UiStyles";
import SearchBox from "./FormComponents/SearchBox";
import Transitions from "./UI/Transitions";
import Chip from "./UI/Chip";

@observer
class Main extends Component {
  render() {
    let showVariantForm = Store.inputCategory === "Variant" && !Store.results ? true : false;
    let showGeneForm = Store.inputCategory === "Genes" && !Store.results ? true : false;
    return (
      <div>
        {/* Autocomplete SearchBox */}
        <SearchBox />
        {/* Chip to confirm what the user entered */}
        <Chip />
        <div style={Styles.positionRelative}>
          {/* Animating between Genes Form, Variant Form and Results depending on STATE! */}
          <Transitions form="VariantForm" if={showVariantForm} />
          <Transitions form="GeneForm" if={showGeneForm} />
          <Transitions form="Results" if={Store.results ? true : false} />
        </div>
      </div>
    );
  }
}
export default Main;
