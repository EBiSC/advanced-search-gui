import React, { Component } from "react"
import { observer } from "mobx-react"
import Toggle from "material-ui/Toggle"
import Store from "../Store"
import Styles from "../UI/UiStyles"

@observer
class ToggleButton extends Component {

    handleToggle(e, isToggled) {
        Store[this.props.value] = isToggled
    }
    render() {
        return (
            <Toggle
                labelStyle={{ fontSize: "25px", fontWeight: "300" }}
                thumbSwitchedStyle={Styles.ThumbSwitch}
                trackSwitchedStyle={Styles.TrackSwitch}
                label={this.props.label}
                toggled={Store[this.props.value]}
                onToggle={this.handleToggle.bind(this)}
            />
        );
    }
}
export default ToggleButton
