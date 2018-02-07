import React, { Component } from "react";
import { observer } from "mobx-react";
import Styles from "../UI/UiStyles";
import { Row, Col } from "react-grid-system";
import VariationConsequence from "../FormComponents/VariationConsequence"
import AlleleFrequency from "../FormComponents/AlleleFrequency"

@observer
class GeneForm extends Component {
  render() {
    return (
      <Row nogutter style={Styles.RowMargin}>
        <Col sm={6}>
          <div
            style={{
              ...Styles.FormColumn,
              marginRight: "16px"
            }}
          >
            <VariationConsequence />
          </div>
        </Col>
        <Col sm={6}>
          <div style={Styles.FormColumn}>
            <AlleleFrequency />
          </div>
        </Col>
      </Row>
    );
  }
}
export default GeneForm;
