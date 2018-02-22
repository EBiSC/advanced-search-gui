import React, { Component } from "react"
import { observer } from "mobx-react"
import Store from "../Store"
import Styles from "../UI/UiStyles"
import ResultBlock from "./ResultBlock"
import NoResults from "./NoResults"

@observer
class Results extends Component {

  render() {
    return (
      <div style={Styles.results}>
        <header style={Styles.ResultsHeader}>
          <h2 style={{margin: "16px 0" }}>
            {Store.searchText}
          </h2>
          <p style={{color: "#4D616A" }}> <i><small>Filters applied: </small> <br />
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

        {Store.inputCategory === "Genes" ? (
          Store.inputType === "Gene Symbol" ? (
            Store.allelefreq > 5 ? (
              <ResultBlock />
            ) : (
                <NoResults />
              )
          ) : Store.inputType === "GO" ? (
            Store.selectedConsequence === "loss of function" ? (
              <ResultBlock />
            ) : (
                <NoResults />
              )
          ) : (
                <ResultBlock />
              )
        ) : (
            <ResultBlock />
          )}
      </div>
    )
  }
}
export default Results
