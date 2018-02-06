import React, { Component } from "react";
import Styles from "./Styles";
import { duration, defaultStyle, transitionStyles } from "./ui/uiAnimations";
import Store from "./Store";
import VariantForm from "./VariantForm";
import Transition from "react-transition-group/Transition";
import Results from "./Results";
import GeneForm from "./GeneForm";

class Transitions extends Component {
  render() {
    var componentList = {
      VariantForm: VariantForm,
      Results: Results,
      GeneForm: GeneForm
    };
    const DynamicForm = componentList[this.props.form];
    return (
      <div>
        <Transition in={this.props.if} timeout={duration}>
          {state => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
              <DynamicForm />
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

export default Transitions;
