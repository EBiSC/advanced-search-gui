import React, { Component } from "react"
import { observer } from "mobx-react"
import Store from "../Store"
import Styles from "../UI/UiStyles"
import ResultBlock from "./ResultBlock"
import Button from 'material-ui/Button'
import ShareIcon from "material-ui/svg-icons/communication/screen-share"

@observer
class Results extends Component {

  render() {
    return (
      <div style={Styles.results}>
        <header style={Styles.ResultsHeader}>
          <h2 style={{ margin: "16px 0" }}>
            {Store.searchText}
            <span style={{ textAlign: "right" }}>
              <Button onClick={() => { Store.share() }} style={{ backgroundColor: "white" }} variant="fab" color="primary" aria-label="share" >
                <ShareIcon />
              </Button>
            </span>
          </h2>
        </header>
        <ResultBlock />
      </div>
    )
  }
}
export default Results
