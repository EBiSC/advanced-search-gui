import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { observer } from "mobx-react";
import Styles from "./Styles";
import { muiTheme } from "./ui/uiTheme";
import AppBar from "./AppBar";
import Title from "./Title";
import Form from "./EBISC";
import Store from "./Store";
import sampleData from "./sample.json";

@observer
class App extends Component {
  componentDidMount() {
    console.log("Sample HIPSCI Data", sampleData);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar />
          <div style={Styles.container}>
            <Title />
            <div style={Styles.App}>
              <Form />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
