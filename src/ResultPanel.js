import React, { Component } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui-next/ExpansionPanel'
import Typography from 'material-ui-next/Typography';
import ExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more"
import Table, { TableBody, TableFooter, TablePagination, TableCell, TableHead, TableRow } from 'material-ui-next/Table'

class ResultPanel extends Component {

    constructor() {
        super()
        this.state = { page: 0, rowsPerPage: 10 }
    }

    render() {
        let result = this.props.data
        return (
            <ExpansionPanel defaultExpanded={true} >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography >
                        Location {result.seq_region_name}:{result.start}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: "90px" }}>Cell Line</TableCell>
                                <TableCell >Cell Type</TableCell>
                                <TableCell >Disease</TableCell>
                                <TableCell >Zygosity</TableCell>
                                <TableCell >View on EBISC</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {result.genotypes && result.genotypes.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(genotype => {
                                return (<TableRow key={genotype.id}>
                                    <TableCell>{genotype.cell_line.name}</TableCell>
                                    <TableCell >{genotype.cell_line.primary_cell_type.name}</TableCell>
                                    <TableCell >{genotype.cell_line.primary_disease.name}</TableCell>
                                    <TableCell >{genotype.genotype}</TableCell>
                                    <TableCell >
                                        <RaisedButton label="View" onClick={() => {
                                            let win = window.open(`https://cells.ebisc.org/${genotype.cell_line.name}/`, '_blank')
                                            win.focus()
                                        }} /></TableCell>
                                </TableRow>)
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={6}
                                    count={result.genotypes.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    backIconButtonProps={{
                                        'aria-label': 'Previous Page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'Next Page',
                                    }}
                                    onChangePage={(event, page) => {
                                        this.setState({ page: page })
                                    }}
                                    onChangeRowsPerPage={(event) => {
                                        this.setState({ rowsPerPage: event.target.value })
                                    }}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}
export default ResultPanel