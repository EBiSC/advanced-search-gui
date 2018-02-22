import React, { Component } from "react"
import { observer } from "mobx-react"
import Store from "../Store"
import Styles from "../UI/UiStyles"
import ResultBlock from "./ResultBlock"

@observer
class Results extends Component {

  render() {
    return (
      <div style={Styles.results}>
        <header style={Styles.ResultsHeader}>
          <h2 style={{ margin: "16px 0" }}>
            {Store.searchText}
          </h2>
          <p style={{ color: "#4D616A" }}> <i><small>Filters applied: </small> <br />
            Species: Homo_sapiens
              {Store.alleleToggle
              ? " - Allele frequency " + Store.allelefreq + "%"
              : ""}
            {Store.zygosity !== "" ? " - " + Store.zygosity : ""}{" "}
            {Store.selectedConsequence !== ""
              ? " - " + Store.selectedConsequence
              : ""}
          </i> </p>
        </header>
        <ResultBlock />
      </div>
    )
  }
}
export default Results
