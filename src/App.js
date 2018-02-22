import React, { Component } from "react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { observer } from "mobx-react"
import Styles from "./UI/UiStyles"
import Store from "./Store"
import { muiTheme } from "./UI/uiTheme"
import AppBar from "./UI/AppBar"
import Title from "./UI/Title"
import Main from "./Main"
import LoginForm from "./Forms/LoginForm"
import Snackbar from "./UI/SnackBar"
import sampleData from "./sampleData/sample.json"

@observer
class App extends Component {

  componentDidMount() {
    // Variant Consequences
    Store.fetchVariantConsequences()
    // Dan's Sample Data
    console.log("Sample HIPSCI Data", sampleData)
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {/* User Feedback/Error Reporting */}
          <Snackbar />
          <AppBar />
          {Store.authenticated && <p style={{ display: "block", width: "auto", fontSize: "44px", margin: "60px", textAlign: "center" }}>Location: {Store.location}</p>}
          {!Store.authenticated && <LoginForm />}
          {Store.authenticated &&
            (<div style={Styles.container}>
              <Title />
              <div style={Styles.App}>
                <Main />
              </div>
            </div>)}

        </div>
      </MuiThemeProvider>
    );
  }
}
export default App
