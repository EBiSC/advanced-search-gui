import React, { Component } from "react";
import { observer } from "mobx-react";
import Styles from "../UI/UiStyles";
import MenuItem from "material-ui/MenuItem";

@observer
class SearchBoxLabel extends Component {

    render() {
        return (
            <div style={Styles.AutoComplete}>
                <MenuItem
                    style={Styles.AutoCompleteLabel}
                    disabled={true}
                    primaryText="Search for Cell Lines"
                />
            </div>
        );
    }
}
export default SearchBoxLabel;
