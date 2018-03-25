import React, { Component } from "react"
import Styles from "../UI/UiStyles"
import Documentation from "../Documentation"

class Title extends Component {
  render() {
    return (
      <header style={Styles.header}>
        <h1 style={Styles.heading}>
          Allelic Query Service
           {/* HELP - Documentation button */}
          < Documentation />
        </h1>

      </header>
    );
  }
}
export default Title
