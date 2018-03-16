import React, { Component } from "react"
import Store from "../Store"
import { observer } from "mobx-react"
import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'

const zygosityOptions = ["All", "Heterozygous", "Homozygous"]

@observer
class Zygosity extends Component {

    handleChange = (e) => {
        Store.zygosity = e.target.value
    }


    render() {
        return (
            <div>
                <div>
                    <h2>Zygosity</h2>
                    <FormControl style={{ width: "100%" }}>
                        <Select
                            style={{ width: "100%" }}
                            value={Store.zygosity}
                            onChange={this.handleChange}
                        >
                            {zygosityOptions.map(x => {
                                return <MenuItem key={x} value={x}>{x}</MenuItem>
                            })}
                        </Select>
                        <FormHelperText>Please select Zygosity</FormHelperText>
                    </FormControl>
                </div>
            </div>
        );
    }
}
export default Zygosity
