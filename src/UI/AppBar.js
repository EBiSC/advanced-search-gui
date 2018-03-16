import React, { Component } from "react"
import Styles from "../UI/UiStyles"
import EBISCLogo from "../img/ebisc.png"
import HIPSCILogo from "../img/hipsci.png"
import { Row, Col } from "react-grid-system"

class AppBar extends Component {
  render() {
    return (
      <Row style={Styles.AppBar}>
        <Col sm={6}>
          <img alt="EBISC Logo" style={Styles.LogoHeight} src={EBISCLogo} />
        </Col>
        <Col style={Styles.AlignRight} sm={6}>
          <img alt="HIPSCI Logo" style={Styles.LogoHeight} src={HIPSCILogo} />
        </Col>
      </Row>
    )
  }
}

export default AppBar