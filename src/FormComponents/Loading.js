import React, { Component } from "react";
import { observer } from "mobx-react";
import Styles from "../UI/UiStyles";
import CircularProgress from "material-ui/CircularProgress";

@observer
class Loading extends Component {

    render() {
        return (
            <div style={Styles.Loading}>
                <CircularProgress color={Styles.LoadingColor} />
            </div>
        );
    }
}
export default Loading;
