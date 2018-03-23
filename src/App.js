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
import Documentation from "./Documentation"

@observer
class App extends Component {

  componentDidMount() {
    // Checking for URL Paramters incase this is a shared URL
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
      setTimeout(() => { window.history.pushState({}, document.title, "/") }, 800)
    }

    if (localStorage["aqs_token"] && localStorage["aqs_time"]) {
      let now = new Date()
      let tokenTime = Date.parse(localStorage["aqs_time"])
      let diff = (now - tokenTime) / 1000
      if (diff < 3000) {
        Store.accessToken = localStorage["aqs_token"]
        //Do Shared Query
        Store.sendRequest()
        setTimeout(() => { Store.accessToken = "" }, (3200 - diff) * 1000)
      }
      else if (share) {
        Store.deferredQuery = true
      }
    }

    let sample = localStorage.getItem('results');
    sample = JSON.parse(sample)
    Store.results = sample

  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {/* User Feedback/Error Reporting */}
          <Dialog />
          {/* Top Bar with the two logos - EBISC and HIPSCI */}
          <AppBar />
          <div style={Styles.container}>
            {/* Title - Allelic Query Service */}
            <Title />
            {/* Going to show the login form if the user is not authenticated */}
            {!Store.authenticated && <LoginForm />}
            {/* Shows the app interface if authenticated */}
            {Store.authenticated &&
              <div style={Styles.App}>
                {/* The heart of the app is here*/}
                <Main />
              </div>}
            {/* Always on documentation here */}
            < Documentation />
          </div>




        </div>
      </MuiThemeProvider >
    );
  }
}
export default App
