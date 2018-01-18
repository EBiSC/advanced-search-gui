import React, { Component } from "react";
import { observer } from "mobx-react";
import Store from "./Store";
import Styles from "./Styles";
import Form from "./Form";
import Results from "./Results";
import GeneForm from "./GeneForm";
import SendQuery from "./SendQuery";
import CellLineForm from "./CellLineForm";
import AutoComplete from "material-ui/AutoComplete";
import ContentDelete from "material-ui/svg-icons/navigation/close";

import MenuItem from "material-ui/MenuItem";
import CircularProgress from "material-ui/CircularProgress";
import Transition from "react-transition-group/Transition";

const duration = 200;
//Store.appearTransform;
//const appearTransform = "translateY(120px)";
//const appearTransformDefault = "translateY(0)";

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
  display: "none",
  transform: "translateY(120px)"
};

const transitionStyles = {
  entering: { opacity: 0, display: "block" },
  exiting: { opacity: 1, display: "block" },
  exited: { opacity: 0, transform: "translateY(120px)", display: "none" },
  entered: {
    opacity: 1,
    display: "block",
    transform: "translateY(0)"
  }
};

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
class EBISC extends Component {
  componentDidMount() {
    fetch(
      "https://rest.ensembl.org/info/variation/consequence_types?content-type=application/json"
    )
      .then(x => x.json())
      .then(x => {
        x.push({ SO_term: "loss of function" });
        Store.consequenceAutocompleteArray = x;
        Store.consequenceAutocompleteArray = x.map(x => x.SO_term);
      });
  }

  handleInput = async value => {
    Store.inputType = "";
    Store.zygosity = "";
    Store.searchText = value;
    Store.results = false;

    //Check for GO Terms
    if (value.toUpperCase().indexOf("GO:") === 0) {
      console.log("pull go");
      Store.inputType = "GO";
      fetch("https://www.ebi.ac.uk/ols/api/select?ontology=go&q=" + value)
        .then(x => x.json())
        .then(x => {
          Store.autocompleteArray = x.response.docs.map(
            x => x.obo_id + " " + x.label
          );
          //  console.log(x);
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
          console.log(x);
          if (x.response.numFound !== 0) {
            Store.autocompleteArray = x.response.docs.map(x => x.label);
            Store.inputType = "Gene Symbol";
          }
        });
      return;
    }
  };

  handleChange = (event, index, value) => {
    Store.dropdown = value;
  };

  proceed = (value, index) => {
    if (index == -1 && Store.inputType !== "" && !Store.loading) {
      console.log("Requesting Results");
      Store.sendRequest();
    }
  };

  render() {
    return (
      <div>
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

        {Store.inputType !== "" && (
          <div>
            <span style={Styles.chipLeft}>{Store.inputType}</span>
          </div>
        )}
        <div style={{ position: "relative" }}>
          <Transition
            in={Store.inputCategory === "Variant" ? true : false}
            timeout={duration}>
            {state => (
              <div
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}>
                <Form />
              </div>
            )}
          </Transition>
          <Transition
            in={Store.inputCategory === "Genes" ? true : false}
            timeout={duration}>
            {state => (
              <div
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}>
                <GeneForm />
              </div>
            )}
          </Transition>

          <Transition
            in={Store.inputCategory === "Cell Lines" ? true : false}
            timeout={duration}>
            {state => (
              <div
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}>
                <CellLineForm />
              </div>
            )}
          </Transition>

          <Transition in={Store.results ? true : false} timeout={duration}>
            {state => (
              <div
                style={{
                  transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
                  display: "none",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  transform: "translateY(120px)",
                  ...transitionStyles[state]
                }}>
                <Results />
              </div>
            )}
          </Transition>
        </div>

        {/*
        {Store.inputType === "" && (
          <div className="tutorial">
            <Row style={{ display: "none", padding: "16px" }}>
              <Col sm={6}>
                <h2>Search Cell Lines by:</h2>
                <ul>
                  <li>
                    VARIANTS
                    <small>RsIDs - rs12344</small>
                    <small>HGVS - ENST00000003084:c.1431_1433delTTC</small>
                  </li>
                  <li>
                    GENES
                    <small>Symbols - BRCA2</small>
                    <small>GO IDs - GO:1234444</small>
                    <small>RefSeq -NG_007400.1:g.8638G>T</small>
                  </li>
                </ul>
              </Col>
              <Col sm={6}>
                <h2>Search Genes by:</h2>
                <ul>
                  <li>
                    CELL LINES
                    <small>HIPSCI CELL LINE - HPSI0114i-eipl_1</small>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
        )}
      */}
      </div>
    );
  }
}
export default EBISC;
