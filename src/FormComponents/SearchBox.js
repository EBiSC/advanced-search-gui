import React, { Component } from "react"
import { observer } from "mobx-react"
import Styles from "../UI/UiStyles"
import Store from "../Store"
import Loading from "./Loading"
import SendButton from "./SendButton"
import SearchBoxLabel from "./SearchBoxLabel"
import AutoComplete from "material-ui/AutoComplete"
import IconButton from 'material-ui-next/IconButton'
import CloseIcon from "material-ui/svg-icons/navigation/close"

@observer
class SearchBox extends Component {

  onPressEnter = (value, index) => {
    // index -1 is for enter key
    if (index === -1 && Store.inputType !== "" && !Store.loading) {
      Store.sendRequest()
    }
  }

  handleInput = async value => {
    // Reset Fields
    Store.resetFields()
    // Store User Input 
    Store.searchText = value;
    Store.getInputType()
  }

  clearInput() {
    // Clear Searchbox
    this.refs[`autocomplete`].setState({ searchText: '' })
    // Reset Fields
    Store.searchText = ""
    Store.inputType = ""
    Store.resetFields()
  }

  render() {
    return (
      <div>
        <div style={Styles.SearchBox}>
          <AutoComplete
            onNewRequest={this.onPressEnter}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={Store.autocompleteArray.slice()}
            ref={`autocomplete`}
            autoFocus
            fullWidth
            name="userInput"
            placeholder={Store.placeholderText}
            onUpdateInput={this.handleInput}
            underlineStyle={{ display: "none" }}
            textFieldStyle={Styles.input}
          />
          {/*Clear Searchfield Button*/}
          {Store.searchText.length > 0 && <IconButton style={{ position: "absolute", right: "0", top: "6px" }} onClick={this.clearInput.bind(this)} aria-label="Close">
            <CloseIcon />
          </IconButton>}

          {/* Circular Loading Icon*/}
          {Store.loading && <Loading />}
          {/* Search Box Label */}
          <SearchBoxLabel />
          {/* Send Button - Only appears when the seach box isn't empty and no ongoing data-loading is in place */}
          {Store.searchText !== "" &&
            !Store.loading && (
              <SendButton />
            )}

        </div>
      </div>
    )
  }
}
export default SearchBox
