import React, { Component } from "react"
import Styles from "../UI/UiStyles"

class Title extends Component {
  render() {
    return (
      <header style={Styles.header}>
        <h1 style={Styles.heading}>
          Allelic Query Service
        </h1>
      </header>
    );
  }
}
export default Title
