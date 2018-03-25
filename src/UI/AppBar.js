import React, { Component } from "react"
import Styles from "../UI/UiStyles"
import Store from "../Store"
import EBISCLogo from "../img/ebisc.png"
import HIPSCILogo from "../img/hipsci.png"
import { Row, Col } from "react-grid-system"
import Button from 'material-ui-next/Button'

class AppBar extends Component {
  render() {
    return (
      <Row style={Styles.AppBar}>
        <Col sm={6}>
          <img alt="EBISC Logo" style={Styles.LogoHeight} src={EBISCLogo} />
        </Col>
        <Col style={Styles.AlignRight} sm={4}>
          {Store.authenticated && <Button onClick={() => {
            localStorage.clear()
            window.location.reload()
          }} > Logout </Button>}
        </Col>
        <Col style={Styles.AlignRight} sm={2}>
          <img alt="HIPSCI Logo" style={Styles.LogoHeight} src={HIPSCILogo} />
        </Col>
      </Row>
    )
  }
}

export default AppBar
