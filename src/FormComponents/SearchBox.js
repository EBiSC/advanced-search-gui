import React, { Component } from "react";
import { observer } from "mobx-react";
import Styles from "../UI/UiStyles";
import Store from "../Store";
import Loading from "./Loading";
import SendButton from "./SendButton";
import SearchBoxLabel from "./SearchBoxLabel";
import AutoComplete from "material-ui/AutoComplete";

const regexes = [
  { pattern: /^rs\d+$/, name: "dbSNP" },
  { pattern: /^([^ :]+):.*?([cgmrp]?)\.?([*\-0-9]+.[^ ]*)/, name: "HGVS" }
];

@observer
class SearchBox extends Component {
  // Not sure about Proceed yet 
  onPressEnter = (value, index) => {
    if (index === -1 && Store.inputType !== "" && !Store.loading) {
      Store.sendRequest();
    }
  };

  handleInput = async value => {
    // Reset Fields
    Store.resetFields();
    // Store User Input 
    Store.searchText = value;
    //Check for GO Terms
    if (value.toUpperCase().indexOf("GO:") === 0) {
      console.log("Looking up GO Terms");
      Store.inputType = "GO";
      await Store.fetchGoSuggest();
      return;
    }
    //Check for Gene Symbols
    if (value.length >= 2 && Store.inputType === "") {
      await Store.fetchGeneSuggest();
      return;
    }
    regexes.forEach(x => {
      value.trim().match(x.pattern) ? (Store.inputType = x.name) : false;
    });
  };


  render() {
    return (
      <div>
        <div style={Styles.SearchBox}>
          <AutoComplete
            onNewRequest={this.onPressEnter}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={Store.autocompleteArray.slice()}
            autoFocus
            fullWidth
            name="userInput"
            placeholder={Store.placeholder}
            onUpdateInput={this.handleInput}
            underlineStyle={{ display: "none" }}
            textFieldStyle={Styles.input}
          />
          {/* Circular Loading Icon*/}
          {Store.loading && <Loading />}
          {/* Search Box Label */}
          <SearchBoxLabel />

          {/* Send Button - Only appears when the seach box isn't empty and no ongoing data-loading is in place */}
          {Store.inputType !== "" &&
            !Store.loading && (
              <SendButton />
            )}

        </div>
      </div>
    );
  }
}
export default SearchBox;
