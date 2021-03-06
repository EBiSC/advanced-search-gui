import React, { Component } from "react"
import { observer } from "mobx-react"
import Store from "./Store"
import Styles from "./UI/UiStyles"
import SearchBox from "./FormComponents/SearchBox"
import Transitions from "./UI/Transitions"

@observer
class Main extends Component {
  render() {
    let showVariantForm = Store.inputCategory === "Variant" ? true : false && !Store.loading
    let showGeneForm = Store.inputCategory === "Gene" ? true : false && !Store.loading
    return (
      <div>
        {/* Autocomplete SearchBox */}
        <SearchBox />
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
export default Main
