import React, { Component } from "react";
import { observer } from "mobx-react";
import Store from "./Store";
import Styles from "./Styles";
import { List, ListItem } from "material-ui/List";
import { Row, Col } from "react-grid-system";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
@observer
class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };
  handleClick = () => {
    this.setState({
      open: true
    });
  };

  render() {
    return (
      <div style={Styles.results}>
        <header
          style={{
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            background: "#D0D8DD",
            padding: "16px 32px"
          }}>
          <h2
            style={{
              margin: "16px 0"
            }}>
            {Store.searchText}
          </h2>
          <p
            style={{
              color: "#4D616A"
            }}>
            <i>
              Homo Sapiens
              {Store.alleleToggle
                ? " - Allele frequency " + Store.allelefreq + "%"
                : ""}
              {Store.zygosity !== "" ? " - " + Store.zygosity : ""}
            </i>
          </p>
        </header>

        <div
          style={{
            padding: "16px 32px 40px",
            fontSize: "18px",
            fontWeight: "300",
            position: "relative"
          }}>
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

          <Snackbar
            open={this.state.open}
            message="This will take you to the HIPSCI website in the final product."
            autoHideDuration={3000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      </div>
    );
  }
}
export default Results;
