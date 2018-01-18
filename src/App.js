import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { observer } from "mobx-react";
import Styles from "./Styles";
import EBISC from "./EBISC";
import EBISCLogo from "./ebisc.png";
import HIPSCILogo from "./hipsci.png";
import { Row, Col } from "react-grid-system";
import Store from "./Store";

const muiTheme = getMuiTheme({
  slider: {
    selectionColor: "#7D95A1",
    handleFillColor: "#B8C5CC"
  }
});

@observer
class App extends Component {
  handleLogin = () => {
    if (Store.username === "" && Store.password === "") {
      alert("Please enter your login credentials");
    } else {
      console.log(Store.username + " " + Store.password);
      var proxyUrl = "https://cors-anywhere.herokuapp.com/";
      fetch(
        proxyUrl +
          "https://ega.ebi.ac.uk/ega/rest/access/v2/users/testuser%40ebi.ac.uk?pass=testpassword"
      )
        .then(blob => blob.json())
        .then(function(data) {
          console.log(data);
        });
    }
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Row
            style={{
              padding: "16px 16px",
              borderBottom: "1px solid rgba(84,110,122,0.25)",
              width: "100%",
              margin: "0 auto",
              boxSizing: "border-box"
            }}>
            <Col sm={6}>
              <img
                alt="EBISC Logo"
                style={{ height: "32px" }}
                src={EBISCLogo}
              />
            </Col>
            <Col style={{ textAlign: "right" }} sm={6}>
              <img
                alt="HIPSCI Logo"
                style={{ height: "32px" }}
                src={HIPSCILogo}
              />
            </Col>
          </Row>

          <div style={Styles.container}>
            <header style={Styles.header}>
              <h1 style={Styles.heading}>
                Allelic Query Service <span style={Styles.subHeading}>UI</span>
              </h1>
            </header>

            <div style={Styles.App} className="App">
              <EBISC />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
