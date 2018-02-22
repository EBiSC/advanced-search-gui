import React, { Component } from "react"
import { observer } from "mobx-react"
import Store from "../Store"
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import LinearProgress from 'material-ui/LinearProgress'
const USERNAME = "username"
const PASSWORD = "password"

@observer
class LoginForm extends Component {

    handleLogin() {
        Store.authenticate()
    }

    handleInput(event, inputType) {
        Store[inputType] = event.target.value
    }

    render() {
        return (
            <div style={{ margin: "120px auto", width: "560px", borderRadius: "8px", border: "2px solid #546e7a", padding: "16px" }}>
                <h1 style={{ color: "#45565F", fontSize: "38px", margin: "16px 0", fontWeight: "300" }}>
                    Login
            </h1>
                <form>
                    <TextField required onChange={(e) => this.handleInput(e, USERNAME)} fullWidth hintText="Email" floatingLabelText="Email" type="email"
                    /><br />
                    <TextField required onChange={(e) => this.handleInput(e, PASSWORD)} fullWidth hintText="Password Field" floatingLabelText="Password" type="password"
                    /><br />
                    <RaisedButton onClick={this.handleLogin} fullWidth secondary={true} label="Login" />

                </form>
                {Store.loading && <LinearProgress style={{ height: "8px" }} mode="indeterminate" />}

            </div>
        );
    }
}
export default LoginForm
