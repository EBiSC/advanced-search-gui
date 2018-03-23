import React, { Component } from "react"
import { observer } from "mobx-react"
import Store from "../Store"
import Styles from "../UI/UiStyles"
import ResultBlock from "./ResultBlock"
import Button from 'material-ui-next/Button'
import ShareIcon from "material-ui/svg-icons/communication/screen-share"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Tooltip from 'material-ui-next/Tooltip'
let tooltip = "Share URL"

@observer
class Results extends Component {

  render() {
    return (
      <div style={Styles.results}>
        <header style={Styles.ResultsHeader}>
          <h2 style={{ margin: "16px 0" }}>
            {Store.searchText}
            <span style={{ position: "absolute", right: "16px", top: "16px" }}>
              {/* Copy Share URL */}
              <Tooltip id="tooltip-icon" title={tooltip}>
                <CopyToClipboard text={Store.savedQuery} onCopy={() => Store.copied()}>
                  <Button onClick={() => { }} style={{ backgroundColor: "white" }} variant="fab" color="primary" aria-label="share" >
                    <ShareIcon />
                  </Button>
                </CopyToClipboard>
              </Tooltip>
            </span>
          </h2>
        </header>
        <ResultBlock />
      </div >
    )
  }
}
export default Results
