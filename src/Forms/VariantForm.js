import React, { Component } from "react"
import { observer } from "mobx-react"
import Styles from "../UI/UiStyles"
import AlleleFrequency from "../FormComponents/AlleleFrequency"
import Zygosity from "../FormComponents/Zygosity"
import { Row, Col } from "react-grid-system"

@observer
class VariantForm extends Component {
  render() {
    return (

      <Row nogutter style={Styles.RowMargin}>
        <Col sm={6}>
          <div
            style={{
              ...Styles.FormColumn,
              marginRight: "16px"
            }}>
            <AlleleFrequency />
          </div>
        </Col>
        <Col sm={6}>
          <div style={Styles.FormColumn}>
            <Zygosity />
          </div>
        </Col>
      </Row>

    );
  }
}
export default VariantForm
