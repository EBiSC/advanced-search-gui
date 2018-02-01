import React, { Component } from "react";
import { observer } from "mobx-react";
import Styles from "./Styles";
import MenuItem from "material-ui/MenuItem";
import Store from "./Store";
import AutoComplete from "material-ui/AutoComplete";
import CircularProgress from "material-ui/CircularProgress";
import SendQuery from "./SendQuery";

const regexes = [
  { pattern: /^rs\d+$/, name: "dbSNP" },
  { pattern: /^([^ :]+)\:.*?([cgmrp]?)\.?([\*\-0-9]+.[^ ]*)/, name: "HGVS" },
  {
    pattern: /^((AC|AP|NC|NG|NM|NP|NR|NT|NW|XM|XP|XR|YP|ZP)_\d+|(NZ\_[A-Z]{4}\d+))(\.\d+)?/,
    name: "RefSeq"
  },
  { pattern: /^GO:\d{7}$/, name: "GO" }
];

@observer
class searchBox extends Component {
  proceed = (value, index) => {
    if (index === -1 && Store.inputType !== "" && !Store.loading) {
      console.log("Requesting Results");
      console.log(Store.inputType);
      Store.sendRequest();
    }
  };

  handleInput = async value => {
    Store.inputType = "";
    Store.zygosity = "";
    Store.selectedConsequence = "";
    Store.searchText = value;
    Store.results = false;

    //Check for GO Terms
    if (value.toUpperCase().indexOf("GO:") === 0) {
      console.log("pull go");
      Store.inputType = "GO";
      Store.fetchStuff(
        "https://www.ebi.ac.uk/ols/api/select?ontology=go&q=" + value
      ).then(x => {
        Store.autocompleteArray = x.response.docs.map(
          x => x.obo_id + " " + x.label
        );
      });
      return;
    }

    regexes.forEach(x => {
      value.trim().match(x.pattern) ? (Store.inputType = x.name) : false;
    });

    //Check for Gene Symbols
    if (value.length >= 2 && Store.inputType === "") {
      fetch("https://www.ebi.ac.uk/ols/api/select?ontology=ogg&q=" + value)
        .then(x => x.json())
        .then(x => {
          if (x.response.numFound !== 0) {
            Store.autocompleteArray = x.response.docs.map(x => x.label);
            Store.inputType = "Gene Symbol";
          }
        });
      return;
    }
  };

  render() {
    return (
      <div>
        <div style={{ width: "100%", position: "relative" }}>
          <AutoComplete
            onNewRequest={this.proceed}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={Store.autocompleteArray.slice()}
            autoFocus
            fullWidth
            hintStyle={{ color: "red" }}
            name="userInput"
            ref="userInput"
            placeholder={Store.placeholder}
            onUpdateInput={this.handleInput}
            underlineStyle={{ display: "none" }}
            textFieldStyle={Styles.input}
          />

          {Store.loading && (
            <div
              style={{
                top: "14px",
                right: "-60px",
                position: "absolute"
              }}>
              <CircularProgress color="#718B98" />
            </div>
          )}
          <div
            style={{
              top: "0px",
              bottom: "0",
              left: "0",
              borderTopLeftRadius: "8px",
              border: "2px solid #546E7A",
              borderBottomLeftRadius: "8px",
              position: "absolute",
              background: "#C4CFD4",
              color: "white"
            }}>
            <div>
              <MenuItem
                style={{
                  cursor: "default",
                  lineHeight: "61px",
                  color: "#111518"
                }}
                disabled={true}
                primaryText="Search for Cell Lines"
              />
            </div>
          </div>
          {Store.inputType !== "" &&
            !Store.loading && (
              <div
                style={{
                  top: "6px",
                  right: "-70px",
                  position: "absolute"
                }}>
                <SendQuery />
              </div>
            )}
        </div>
      </div>
    );
  }
}
export default searchBox;
