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
import Chip from "./Chip";
import { duration, defaultStyle, transitionStyles } from "./ui/uiAnimations";

@observer
class EBISC extends Component {
  componentDidMount() {
    //Load Variant Consequences
    fetch(
      "https://rest.ensembl.org/info/variation/consequence_types?content-type=application/json"
    )
      .then(x => x.json())
      .then(x => {
        x.push({ SO_term: "loss of function" });
        x = x.map(x => x.SO_term);
        x = x
          .join()
          .replace(/_/g, " ")
          .split(",");
        Store.consequenceAutocompleteArray = x;
      });
  }

  render() {
    return (
      <div>
        <div>
          <Snackbar />
          <SearchBox />
        </div>
        <Chip />
        <div style={Styles.positionRelative}>
          <Transition
            in={
              Store.inputCategory === "Variant" && !Store.results ? true : false
            }
            timeout={duration}>
            {state => (
              <div
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}>
                <VariantForm />
              </div>
            )}
          </Transition>
          <Transition
            in={
              Store.inputCategory === "Genes" && !Store.results ? true : false
            }
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

          <Transition in={Store.results ? true : false} timeout={duration}>
            {state => (
              <div
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}>
                <Results />
              </div>
            )}
          </Transition>
        </div>
      </div>
    );
  }
}
export default EBISC;
