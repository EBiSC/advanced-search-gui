import React, { Component } from "react"
import Styles from "../UI/UiStyles"
import Store from "../Store"
import { observer } from "mobx-react"
import Slider from "material-ui/Slider"
import Checkbox from 'material-ui/Checkbox'

@observer
class AlleleFrequency extends Component {

    handleChange(event) {
        Store.allelefreqToggle = event.target.checked
    }

    render() {
        return (
            <div style={{ height: "110px" }}>
                <h2>Allele Frequency {Store.allelefreqToggle ? Store.allelefreq.toFixed(2) : ""}</h2>
                <div style={{ display: "flex" }}>
                    <Checkbox
                        style={{ width: "20px", height: "20px", padding: "16px" }}
                        checked={Store.allelefreqToggle} color="primary"
                        onChange={this.handleChange}
                    />
                    {Store.allelefreqToggle && <Slider style={{ width: "80%" }} min={0} max={1} step={0.05}
                        defaultValue={Store.allelefreq}
                        sliderStyle={Styles.Slider}
                        onChange={(e, value) => {
                            Store.allelefreq = value
                        }} />}
                </div>
            </div>
        );
    }
}
export default AlleleFrequency
