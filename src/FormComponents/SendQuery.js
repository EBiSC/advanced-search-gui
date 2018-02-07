import React, { Component } from "react";
import { observer } from "mobx-react";
import Store from "../Store";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentSearch from "material-ui/svg-icons/action/search";

@observer
class SendQuery extends Component {
  handleSend = () => {
    Store.sendRequest();
  };

  render() {
    return (
      <FloatingActionButton
        onClick={this.handleSend}
        backgroundColor="#45565F">
        <ContentSearch />
      </FloatingActionButton>
    );
  }
}
export default SendQuery;
