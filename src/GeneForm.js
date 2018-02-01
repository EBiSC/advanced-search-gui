import React, { Component } from "react";
import { observer } from "mobx-react";
import Store from "./Store";
import Toggle from "material-ui/Toggle";
import Slider from "material-ui/Slider";
import { Row, Col } from "react-grid-system";
import AutoComplete from "material-ui/AutoComplete";

@observer
class GeneForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlleleFrequencyOptions: true,
      showZygosityOptions: true
    };
  }

  handleInput = value => {
    Store.selectedConsequence = value;
  };

  handleAlleleFrequencyToggle = (e, isToggled) => {
    Store.alleleToggle = isToggled;
  };

  handleZygosityToggle = (e, isToggled) => {
    this.setState({
      showZygosityOptions: isToggled
    });
  };

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
              <h2>VARIATION CONSEQUENCE</h2>
              <AutoComplete
                filter={AutoComplete.caseInsensitiveFilter}
                fullWidth
                onUpdateInput={this.handleInput}
                dataSource={Store.consequenceAutocompleteArray.slice()}
                underlineStyle={{ borderColor: "#ADADAD" }}
                hintText="e.g. stop gained"
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
              <Toggle
                labelStyle={{ fontSize: "25px", fontWeight: "300" }}
                thumbSwitchedStyle={{ backgroundColor: "#5E7682" }}
                trackSwitchedStyle={{ backgroundColor: "#B8C5CC" }}
                label={
                  "ALLELE FREQUENCY " +
                  (Store.alleleToggle ? Store.allelefreq + "%" : "")
                }
                toggled={Store.alleleToggle}
                onToggle={this.handleAlleleFrequencyToggle.bind(this)}
              />

              <div>
                <Slider
                  disabled={!Store.alleleToggle}
                  min={0}
                  max={100}
                  step={5}
                  defaultValue={Store.allelefreq}
                  sliderStyle={{ borderColor: "red", marginBottom: "38px" }}
                  onChange={(e, value) => {
                    Store.allelefreq = value;
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default GeneForm;
