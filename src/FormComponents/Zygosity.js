import React, { Component } from "react"
import Store from "../Store"
import { observer } from "mobx-react"
import ToggleButton from "./ToggleButton"
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton"

@observer
class Zygosity extends Component {

    render() {
        return (
            <div>
                <ToggleButton label="ZYGOSITY" value="zygosityToggle" />
                <div>
                    <RadioButtonGroup
                        onChange={(e, value) => {
                            Store.zygosity = value
                        }}
                        name="zygosity">
                        <RadioButton
                            disabled={!Store.zygosityToggle}
                            style={{
                                padding: "8px"
                            }}
                            value="Heterozygous"
                            label="Heterozygous"
                        />
                        <RadioButton
                            disabled={!Store.zygosityToggle}
                            style={{
                                padding: "8px"
                            }}
                            value="Homozygous"
                            label="Homozygous"
                        />
                    </RadioButtonGroup>
                </div>
            </div>
        );
    }
}
export default Zygosity
