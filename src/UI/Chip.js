import React, { Component } from "react";
import { observer } from "mobx-react";
import Styles from "../UI/UiStyles";
import Store from "../Store";

@observer
class Chip extends Component {
  render() {
    return (
      <div>
        {Store.inputType !== "" && (
          <span style={Styles.chipLeft}>{Store.inputType}</span>
        )}
      </div>
    );
  }
}
export default Chip;
