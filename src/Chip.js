import React, { Component } from "react";
import { observer } from "mobx-react";
import Styles from "./Styles";
import Store from "./Store";

@observer
class Chip extends Component {
  render() {
    return (
      <div>
        {Store.inputType !== "" && (
          <div>
            <span style={Styles.chipLeft}>{Store.inputType}</span>
          </div>
        )}
      </div>
    );
  }
}
export default Chip;
