import React, { Component } from "react"
import { observer } from "mobx-react"
import Store from "../Store"
import { GENE } from "../Constants"
import ResultPanel from "../ResultPanel"
import Styles from "../UI/UiStyles"

// Results Container with the share and download buttons
@observer
class ResultBlock extends Component {
  render() {
    return (
      <div style={Styles.ResultBlock}>
        {Store.inputCategory === GENE && <p>{Store.results.length} variants</p>}
        {Store.results && Store.results.map(result => {
          return <ResultPanel data={result} key={result.start} />
        })}
      </div >)
  }
}
export default ResultBlock