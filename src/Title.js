import React, { Component } from "react";
import Styles from "./Styles";

class Title extends Component {
  render() {
    return (
      <header style={Styles.header}>
        <h1 style={Styles.heading}>
          Allelic Query Service <span style={Styles.subHeading}>UI</span>
        </h1>
      </header>
    );
  }
}
export default Title;
