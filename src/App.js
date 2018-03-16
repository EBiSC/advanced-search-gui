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
import Dialog from "./Dialog"

@observer
class App extends Component {

  componentDidMount() {

    // Check for URL Parameter
    var url_string = window.location.href
    var url = new URL(url_string)
    var share = url.searchParams.get("share")
    if (share) {
      share = JSON.parse(share)
      Store.inputType = share.inputType
      Store.searchText = share.searchText
      Store.selectedConsequence = share.consequence
      Store.zygosity = share.zygosity
      Store.allelefreq = share.allele_freq
      Store.allelefreqToggle = share.allelefreqToggle
      console.log(share)
    }

    if (localStorage["aqs_token"] && localStorage["aqs_time"]) {
      let now = new Date()
      let tokenTime = Date.parse(localStorage["aqs_time"])
      console.log(localStorage["aqs_time"])
      let diff = (now - tokenTime) / 1000
      if (diff < 3000) {
        Store.accessToken = localStorage["aqs_token"]
        //Do Shared Query
        Store.sendRequest()
        console.log("Logout after: " + (3200 - diff) / 60)
        setTimeout(() => { Store.accessToken = "" }, (3200 - diff) * 1000)
      }
      else if (share) {
        Store.deferredQuery = true
      }
    }
    /*
    let sample = localStorage.getItem('results');
    sample = JSON.parse(sample)
    console.log(sample)
    Store.results = sample
    */
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {/* User Feedback/Error Reporting */}
          <Dialog />
          <AppBar />
          <div style={Styles.container}>
            <Title />
            {!Store.authenticated && <LoginForm />}
            {Store.authenticated &&
              <div style={Styles.App}>
                <Main />
              </div>}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App
