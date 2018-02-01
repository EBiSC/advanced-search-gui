import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { observer } from "mobx-react";
import Styles from "./Styles";
import { muiTheme } from "./uiTheme";
import AppBar from "./AppBar";
import Title from "./Title";
import Form from "./EBISC";

@observer
class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar />
          <div style={Styles.container}>
            <Title />
            <div style={Styles.App} className="App">
              <Form />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
