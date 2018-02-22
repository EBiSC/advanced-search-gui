import React, { Component } from "react"
import { observer } from "mobx-react"

@observer
class NoResults extends Component {
  render() {
    return (
      <div
        style={{
          padding: "16px 32px 40px",
          fontSize: "18px",
          fontWeight: "300",
          position: "relative"
        }}>
        <p>No Results :(</p>
      </div>
    );
  }
}
export default NoResults
