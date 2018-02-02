import React, { Component } from "react";
import Styles from "./Styles";
import { duration, defaultStyle, transitionStyles } from "./ui/uiAnimations";
import Store from "./Store";

class Transitions extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        fdffdfdfdfdfdfdfdd
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
      </div>
    );
  }
}

export default Transitions;
