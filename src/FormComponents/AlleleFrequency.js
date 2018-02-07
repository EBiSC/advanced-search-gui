import React, { Component } from "react";
import Styles from "../UI/UiStyles";
import Store from "../Store";
import { observer } from "mobx-react";
import ToggleButton from "./ToggleButton";
import Slider from "material-ui/Slider";

@observer
class AlleleFrequency extends Component {

    handleToggle = (e, isToggled) => {
        console.log("HandleToggle");
        Store.alleleToggle = isToggled;
    }

    render() {
        return (
            <div>
                <ToggleButton label={
                    "ALLELE FREQUENCY " +
                    (Store.alleleToggle ? Store.allelefreq + "%" : "")
                } value="alleleToggle" />

                <div>
                    <Slider
                        disabled={!Store.alleleToggle}
                        min={0}
                        max={100}
                        step={5}
                        defaultValue={Store.allelefreq}
                        sliderStyle={Styles.Slider}
                        onChange={(e, value) => {
                            Store.allelefreq = value;
                        }}
                    />
                </div>
            </div>
        );
    }
}
export default AlleleFrequency;
