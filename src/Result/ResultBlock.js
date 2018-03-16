import React, { Component } from "react"
import { observer } from "mobx-react"
import Store from "../Store"
import ResultPanel from "../ResultPanel"
import Styles from "../UI/UiStyles"


@observer
class ResultBlock extends Component {

  render() {
    return (
      <div style={Styles.ResultBlock}>
        {Store.results && Store.results.map(result => {
          return <ResultPanel data={result} key={result.start} />
        })}
      </div >)
  }
}
export default ResultBlock