import React, { Component } from "react"
import docs from "./Documentation.md"
import Markdown from 'react-remarkable'

class Documentation extends Component {
    constructor() {
        super()
        this.state = {}
    }
    componentDidMount() {
        //Fetch docs AS HTML from the documentation.md file
        fetch(docs).then(response => response.text()).then(text => {
            this.setState({ markdown: (text) })
        })
    }

    render() {
        return (
            <div>
                {this.state.markdown && <Markdown source={(this.state.markdown)} />}
            </div>
        )
    }
}
export default Documentation