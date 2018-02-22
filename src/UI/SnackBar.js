import React, { Component } from "react"
import { observer } from "mobx-react"
import Snackbar from "material-ui/Snackbar"
import Store from "../Store"

@observer
class SnackBar extends Component {
  handleRequestClose = () => {
    Store.snackbar = false
  }

  render() {
    return (
      <Snackbar
        open={Store.snackbar}
        message={Store.snackbarText}
        autoHideDuration={3000}
        onRequestClose={this.handleRequestClose}
      />
    )
  }
}
export default SnackBar
