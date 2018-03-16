import React, { Component } from "react"
import { observer } from "mobx-react"
import Store from "../Store"
import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'

@observer
class VariationConsequence extends Component {

    handleChange(e) {
        Store.selectedConsequence = e.target.value
    }

    render() {
        return (
            <div style={{ height: "110px" }}>
                <h2>Variation Consequence</h2>
                <form>
                    <FormControl style={{ width: "100%" }}>
                        <Select
                            style={{ width: "100%" }}
                            value={Store.selectedConsequence}
                            onChange={this.handleChange}
                        >
                            {Store.consequenceAutocompleteArray.map(x => {
                                return <MenuItem key={x} value={x}>{x}</MenuItem>
                            })}
                        </Select>
                        <FormHelperText>Please select a consequence</FormHelperText>
                    </FormControl>
                </form>

            </div >
        );
    }
}
export default VariationConsequence
