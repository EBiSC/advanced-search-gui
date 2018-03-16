import React, { Component } from "react"
import { observer } from "mobx-react"
import Store from "../Store"
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import CircularProgress from 'material-ui/CircularProgress';
const USERNAME = "username"
const PASSWORD = "password"

@observer
class LoginForm extends Component {

    handleLogin(event) {
        Store.authenticate()
        event.preventDefault()
    }

    handleInput(event, inputType) {
        Store.authError = ""
        Store[inputType] = event.target.value
    }

    render() {
        return (
            <div style={{ margin: "80px auto", width: "560px", padding: "16px" }}>
                <form onSubmit={this.handleLogin}>
                    <TextField
                        label="Email"
                        underlineFocusStyle={{ borderColor: "#546e7af2" }}
                        required onChange={(e) => this.handleInput(e, USERNAME)} fullWidth hintText="Email" type="email" id="email"
                    /><br /> <br />
                    <TextField
                        label="Password"
                        underlineFocusStyle={{ borderColor: "#546e7af2" }}
                        errorText={Store.authError} required onChange={(e) => this.handleInput(e, PASSWORD)} fullWidth hintText="Password" type="password" id="password"
                    /><br />
                    <div style={{ position: "relative", margin: "40px auto", display: "block", textAlign: "center" }}>
                        <Button variant="raised" type="submit" style={{ padding: "0px" }}  >
                            {Store.loading ? "Loading.." : "Login"}
                        </Button>
                        {Store.loading2 && <CircularProgress color={"#546e7af2"} style={{ verticalAlign: "bottom", padding: "0px 32px" }} />}
                    </div>
                </form>
            </div >
        );
    }
}
export default LoginForm
