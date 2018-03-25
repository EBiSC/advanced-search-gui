import React, { Component } from "react"
import docs from "./Documentation.md"
import Markdown from 'react-remarkable'
import Button from 'material-ui-next/Button'
import Dialog from 'material-ui-next/Dialog'
import AppBar from 'material-ui-next/AppBar'
import Toolbar from 'material-ui-next/Toolbar'
import IconButton from 'material-ui-next/IconButton'
import Typography from 'material-ui-next/Typography'
import CloseIcon from "material-ui/svg-icons/navigation/close"

class Documentation extends Component {
    constructor() {
        super()
        this.state = { open: false }
    }
    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }
    componentDidMount() {
        //Fetch docs AS HTML from the documentation.md file
        fetch(docs).then(response => response.text()).then(text => {
            this.setState({ markdown: (text) })
        })
    }

    render() {
        return (
            <span>
                {/* Documentation Show Button */}
                <Button onClick={this.handleClickOpen}>HELP</Button>
                {/* Dialog Config */}
                <Dialog fullScreen open={this.state.open} onClose={this.handleClose} >
                    <AppBar style={{ backgroundColor: "#546e7af2" }} >
                        <Toolbar>
                            <Typography style={{ color: "#fff" }} variant="title" >Documentation</Typography>
                            <IconButton style={{ color: "#fff" }} onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div style={{ padding: "80px 60px" }}>
                        {this.state.markdown && <Markdown source={(this.state.markdown)} />}
                    </div>
                </Dialog>
            </span>
        )
    }
}
export default Documentation