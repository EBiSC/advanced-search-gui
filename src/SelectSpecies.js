import React, { Component } from "react";
import { observer } from "mobx-react";
import Store from "./Store";
import Styles from "./Styles";
import AutoComplete from "material-ui/AutoComplete";

const URL = "https://gti-es-0.ebi.ac.uk:8080/api/";

@observer
class SelectSpecies extends Component {
  handleInput(value) {}

  onSelect(value) {
    //https://gti-es-0.ebi.ac.uk:8080/api/genomes/query?query={"id":"homo_sapiens"}&fields=*
    /*
    let result = await Store.fetchStuff(
      'genomes/query?query={"id":"' + value.id + '"}&fields=*'
    );
    console.log(result.results[0]);
    */
    Store.selectedSpecies = value.id;
    Store.stepIndex = 1;
  }

  render() {
    return (
      <div>
        <AutoComplete
          dataSourceConfig={{ text: "value", value: "id" }}
          onNewRequest={this.onSelect.bind(this)}
          filter={AutoComplete.caseInsensitiveFilter}
          hintText="Search Species"
          underlineStyle={{ display: "none" }}
          style={{
            margin: "32px",
            padding: "8px 32px",
            borderWidth: 0,
            backgroundColor: "white"
          }}
          fullWidth
          dataSource={Store.speciesSuggestions.slice()}
          onUpdateInput={this.handleInput}
        />
      </div>
    );
  }
}
export default SelectSpecies;
