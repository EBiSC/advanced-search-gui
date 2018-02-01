import React, { Component } from "react";
import { observer } from "mobx-react";
import Store from "./Store";
import Styles from "./Styles";
import ResultBlock from "./ResultBlock";
import NoResults from "./NoResults";
import { List, ListItem } from "material-ui/List";
import { Row, Col } from "react-grid-system";
import RaisedButton from "material-ui/RaisedButton";

@observer
class Results extends Component {
  handleClick = () => {
    Store.snackbar = true;
  };

  render() {
    return (
      <div style={Styles.results}>
        <header
          style={{
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            background: "#D0D8DD",
            padding: "16px 32px"
          }}>
          <h2
            style={{
              margin: "16px 0"
            }}>
            {Store.searchText}
          </h2>
          <p
            style={{
              color: "#4D616A"
            }}>
            <i>
              <small>Filters applied: </small> <br />
              Species: Homo_sapiens
              {Store.alleleToggle
                ? " - Allele frequency " + Store.allelefreq + "%"
                : ""}
              {Store.zygosity !== "" ? " - " + Store.zygosity : ""}{" "}
              {Store.selectedConsequence !== ""
                ? " - " + Store.selectedConsequence
                : ""}
            </i>
          </p>
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

        {/*
        {Store.inputCategory === "Genes" ? (
          Store.selectedConsequence === "loss of function" ? (
            Store.allelefreq === 10 ? (
              <ResultBlock />
            ) : (
              <NoResults />
            )
          ) : (
            <NoResults />
          )
        ) : (
          <ResultBlock />
        )}


        */}
      </div>
    );
  }
}
export default Results;
