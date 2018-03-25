import React, { Component } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui-next/ExpansionPanel'
import Typography from 'material-ui-next/Typography';
import ExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more"
import Table, { TableBody, TableFooter, TableSortLabel, TablePagination, TableCell, TableHead, TableRow } from 'material-ui-next/Table'

// Populates the result table per variant
// Adds pagination and sorting on the result tables
class ResultPanel extends Component {
    constructor() {
        super()
        this.state = { page: 0, rowsPerPage: 10, order: "asc", orderBy: "name" }
    }

    handleRequestSort = (event, property) => {
        const orderBy = property
        let order = 'desc'
        if (this.state.orderBy === property && this.state.order === 'desc') { order = 'asc' }
        this.setState({ order, orderBy })
        let genotypes = this.props.data
        //Sorting by Name
        if (orderBy === "name") {
            if (order === "desc")
                genotypes.genotypes = genotypes.genotypes.sort((a, b) => (b.cell_line.name < a.cell_line.name ? -1 : 1))
            else
                genotypes.genotypes = genotypes.genotypes.sort((a, b) => (a.cell_line.name < b.cell_line.name ? -1 : 1))
        }
        //Sorting by Zygosity
        if (orderBy === "zygosity") {
            if (order === "desc")
                genotypes.genotypes = genotypes.genotypes.sort((a, b) => (b.genotype < a.genotype ? -1 : 1))
            else
                genotypes.genotypes = genotypes.genotypes.sort((a, b) => (a.genotype < b.genotype ? -1 : 1))
        }
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
                                <TableCell style={{ width: "90px" }}>
                                    <TableSortLabel
                                        active={this.state.orderBy === "name"}
                                        direction={this.state.order} onClick={(event) => this.handleRequestSort(event, "name")}>
                                        Cell Line
                                        </TableSortLabel>
                                </TableCell>
                                <TableCell >Cell Type</TableCell>
                                <TableCell >Disease</TableCell>
                                <TableCell >
                                    <TableSortLabel
                                        active={this.state.orderBy === "zygosity"}
                                        direction={this.state.order} onClick={(event) => this.handleRequestSort(event, "zygosity")}>
                                        Zygosity
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell >View on EBISC</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*Populating Tables with pagination*/}
                            {result.genotypes && result.genotypes.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(genotype => {
                                return (<TableRow key={genotype.id}>
                                    <TableCell style={{ width: "110px" }}>
                                        {genotype.cell_line.name}
                                    </TableCell>
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
                                    backIconButtonProps={{ 'aria-label': 'Previous Page', }}
                                    nextIconButtonProps={{ 'aria-label': 'Next Page', }}
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
            </ExpansionPanel >
        )
    }
}
export default ResultPanel