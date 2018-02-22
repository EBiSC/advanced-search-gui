import React, { Component } from "react"
import { observer } from "mobx-react"
import Store from "../Store"
import AutoComplete from "material-ui/AutoComplete"

@observer
class VariationConsequence extends Component {

    handleInput = value => {
        Store.selectedConsequence = value
    };

    render() {
        return (
            <div>
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
        );
    }
}
export default VariationConsequence
