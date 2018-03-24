import React, { Component } from "react"
import { observer } from "mobx-react"
import Store from "../Store"
import Styles from "../UI/UiStyles"
import ResultBlock from "./ResultBlock"
import Button from 'material-ui-next/Button'
import ShareIcon from "material-ui/svg-icons/communication/screen-share"
import DownloadIcon from "material-ui/svg-icons/file/file-download"
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

            {/* Download .CSV file Button */}
            <span style={{ position: "absolute", right: "92px", top: "16px" }}>
              <Tooltip id="tooltip-icon" title={"Download .csv"}>
                <Button onClick={() => Store.CSVDownload()} style={{ backgroundColor: "white" }} variant="fab" color="primary" aria-label="share" >
                  <DownloadIcon />
                </Button>
              </Tooltip>
            </span>

            {/* Copy Share URL Button */}
            <span style={{ position: "absolute", right: "16px", top: "16px" }}>
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
