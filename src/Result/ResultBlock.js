import React, { Component } from "react"
import { observer } from "mobx-react"
import Store from "../Store"
import Styles from "../UI/UiStyles"
import { List, ListItem } from "material-ui/List"
import { Row, Col } from "react-grid-system"
import RaisedButton from "material-ui/RaisedButton"

@observer
class ResultBlock extends Component {
  handleClick = () => {
    Store.snackbar = true
  };

  render() {
    return (
      <div
        style={Styles.ResultBlock}>
        <h2
          style={{
            margin: "16px",
            display: "inline-block"
          }}>
          <small>CELL LINE</small> <br />
          HPSI1013i-yemz_3{" "}
        </h2>
        <RaisedButton
          onClick={this.handleClick}
          style={{ position: "absolute", right: "32px", top: "40px" }}
          secondary={true}
          label="View"
        />

        <Row>
          <Col>
            <List>
              <ListItem
                disabled={true}
                primaryText="Banked at EBiSC as WTSIi022-B "
                secondaryText="Banking Status"
              />
              <ListItem
                disabled={true}
                primaryText="Cambridge BioResource"
                secondaryText="Tissue provider"
              />
              <ListItem
                disabled={true}
                primaryText="2014-04-17"
                secondaryText="Date of derivation"
              />
            </List>
          </Col>
          <Col>
            <List>
              <ListItem
                primaryText="Male"
                disabled={true}
                secondaryText="Donor sex"
              />
              <ListItem
                disabled={true}
                primaryText="White - White British"
                secondaryText="Donor ethnicity"
              />
              <ListItem
                disabled={true}
                primaryText="Skin Tissue"
                secondaryText="Source material"
              />
            </List>
          </Col>
        </Row>
      </div>
    );
  }
}
export default ResultBlock
