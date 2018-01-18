import React, { Component } from "react";
import { observer } from "mobx-react";
import Store from "./Store";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import Toggle from "material-ui/Toggle";
import Slider from "material-ui/Slider";
import { Row, Col } from "react-grid-system";

@observer
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlleleFrequencyOptions: true,
      showZygosityOptions: true
    };
  }

  handleAlleleFrequencyToggle = (e, isToggled) => {
    Store.alleleToggle = isToggled;
  };

  handleZygosityToggle = (e, isToggled) => {
    if (!isToggled) Store.zygosity = "";
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
                border: "1px solid rgba(84,110,122,0.65)",
                borderRadius: "8px",
                padding: "16px",
                marginRight: "16px"
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
                toggled={this.state.showZygosityOptions}
                label="ZYGOSITY"
                onToggle={this.handleZygosityToggle.bind(this)}
              />

              <div>
                <RadioButtonGroup
                  onChange={(e, value) => {
                    Store.zygosity = value;
                  }}
                  name="allelefreq">
                  <RadioButton
                    disabled={!this.state.showZygosityOptions}
                    style={{
                      padding: "8px"
                    }}
                    value="Heterozygous"
                    label="Heterozygous"
                  />
                  <RadioButton
                    disabled={!this.state.showZygosityOptions}
                    style={{
                      padding: "8px"
                    }}
                    value="Homozygous"
                    label="Homozygous"
                  />
                </RadioButtonGroup>
              </div>
            </div>
          </Col>
        </Row>

        {/*
        <div style={{ marginTop: "22px" }}>
          <div>
            <Toggle
              label={
                "ALLELE FREQUENCY " +
                (this.state.showAlleleFrequencyOptions
                  ? Store.allelefreq + "%"
                  : "")
              }
              toggled={this.state.showAlleleFrequencyOptions}
              onToggle={this.handleToggle.bind(this)}
            />

            {this.state.showAlleleFrequencyOptions && (
              <div>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  defaultValue={Store.allelefreq}
                  style={{ color: "#333", fill: "red", borderColor: "red" }}
                  onChange={(e, value) => {
                    Store.allelefreq = value;
                  }}
                />
              </div>
            )}

            <Toggle
              toggled={this.state.showZygosityOptions}
              label="ZYGOSITY"
              onToggle={this.handleToggle2.bind(this)}
            />

            {this.state.showZygosityOptions && (
              <div>
                <RadioButtonGroup name="allelefreq" defaultSelected="community">
                  <RadioButton
                    style={{
                      padding: "8px"
                    }}
                    value="Heterozygous"
                    label="Heterozygous"
                  />
                  <RadioButton
                    style={{
                      padding: "8px"
                    }}
                    value="Homozygous"
                    label="Homozygous"
                  />
                </RadioButtonGroup>
              </div>
            )}
          </div>
        </div>

        */}
      </div>
    );
  }
}
export default Form;
