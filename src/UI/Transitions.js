import React, { Component } from "react"
import { duration, defaultStyle, transitionStyles } from "../UI/uiAnimations"
import Transition from "react-transition-group/Transition"
import VariantForm from "../Forms/VariantForm"
import Results from "../Result/Results"
import GeneForm from "../Forms/GeneForm"

class Transitions extends Component {
  render() {
    var componentList = {
      VariantForm: VariantForm,
      Results: Results,
      GeneForm: GeneForm
    }
    const DynamicForm = componentList[this.props.form]
    return (
      <div>
        <Transition in={this.props.if} timeout={duration}>
          {state => (
            <div
              style={{
                ...defaultStyle, ...transitionStyles[state]
              }}>
              <DynamicForm />
            </div>
          )}
        </Transition>
      </div>
    )
  }
}

export default Transitions
