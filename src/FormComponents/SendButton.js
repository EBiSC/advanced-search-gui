import React, { Component } from "react";
import { observer } from "mobx-react";
import Styles from "../UI/UiStyles";
import SendQuery from "./SendQuery";

@observer
class SendButton extends Component {

    render() {
        return (
            <div style={Styles.SendButton}>
                <SendQuery />
            </div>
        );
    }
}
export default SendButton;
