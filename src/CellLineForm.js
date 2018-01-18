import React, { Component } from "react";
import { observer } from "mobx-react";
import TextField from "material-ui/TextField";
import { Row, Col } from "react-grid-system";

@observer
class CellLineForm extends Component {
  render() {
    return (
      <div>
        <Row
          nogutter
          style={{
            margin: "24px 0"
          }}>
          <Col sm={6}>
            <div
              style={{
                boxSizing: "border-box",
                padding: "16px",
                border: "1px solid rgba(84,110,122,0.65)",
                borderRadius: "8px",
                marginRight: "16px"
              }}>
              <h2>Second Cell Line</h2>

              <TextField
                name="userInput"
                fullWidth
                placeholder="CELL LINE 2"
                onChange={this.handleInput}
                underlineStyle={{ borderColor: "#ADADAD" }}
              />
            </div>
          </Col>
          <Col sm={6}>
            <div
              style={{
                boxSizing: "border-box",
                padding: "16px",
                border: "1px solid rgba(84,110,122,0.65)",
                borderRadius: "8px"
              }}>
              <h2>GENE ANNOTATION</h2>
              <TextField
                fullWidth
                underlineStyle={{ borderColor: "#ADADAD" }}
                hintText="loss of function"
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default CellLineForm;
