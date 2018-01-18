import React, { Component } from "react";
import { observer } from "mobx-react";
import Styles from "./Styles";

@observer
class Transcripts extends Component {
  render() {
    let transcripts = this.props.data;
    return (
      <div styles={Styles.transcriptsBox}>
        {transcripts.map(x => <p key={x.id}>{x.id}</p>)}
      </div>
    );
  }
}
export default Transcripts;
