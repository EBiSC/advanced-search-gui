import React, { Component } from "react"
import { observer } from "mobx-react"
import Dialog, {
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui-next/Dialog'
import Store from "./Store"
import Slide from 'material-ui-next/transitions/Slide'

// Dialog Transition
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

@observer
class DialogBox extends Component {
    handleClose() {
        Store.dialog.title = ""
    }
    render() {
        return (
            <Dialog
                open={Store.dialog.title !== ""}
                transition={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    {Store.dialog.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        {Store.dialog.content}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        )
    }
}
export default DialogBox