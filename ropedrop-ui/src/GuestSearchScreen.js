import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten, fade } from '@material-ui/core/styles/colorManipulator';
import axios from 'axios';
var apiBaseUrl = "http://localhost:31415/api/";

let counter = 0;

function createData(resultsblob) {
	let inResults = resultsblob;
	let dataArray = [];
	inResults.foreach(function(row){
		dataArray.push(row.guestID, row.firstname, row.lastname, row.zipcode, row.seasonpass);
	});
  counter += 1;
  return dataArray;
}

function createSampleData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp){
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy){
	return order === 'desc' ? (a,b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
	{ id: 'firstname', numeric: false, disablePadding: true, label: 'First Name' },
	{ id: 'lastname', numeric: false, disablePadding: true, label: 'Last Name' },
	{ id: 'zipcode', numeric: true, disablePadding: true, label: 'Zip Code' },
	{ id: 'seasonpass', numeric: false, disablePadding: true, label: "Season Pass ID" },
	{ id: 'recoveries', numeric:true, disablePadding: true, label: "Recoveries Given"},
]

class EnhancedTableHead extends React.Component {
	createSortHandler = property => event => {
		this.props.onRequestSort(event, property);
	};

	render() {
		const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
		return (
			<TableHead>
				<TableRow>
					<TableCell padding="checkbox">
						<Checkbox
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={numSelected === rowCount}
							onChange={onSelectAllClick}
						/>
					</TableCell>
					{rows.map(row => {
						return (
							<TableCell
								key={row.id}
								numeric={row.numeric}
								padding={row.disablePadding ? 'none' : 'default'}
								sortDirection={orderBy === row.id ? order : false}
							>
								<Tooltip
									title="Sort"
									placement={row.numeric ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={orderBy === row.id}
										direction={order}
										onClick={this.createSortHandler(row.id)}
									>
									  {row.label}
									</TableSortLabel>
								</Tooltip>
							</TableCell>
						);
					}, this)}
				</TableRow>
			</TableHead>
		);
	}
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  grow: {
  	flexGrow: 1,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});


let EnhancedTableToolbar = props => {
	const { numSelected, classes } = props;

	return (
		<AppBar position="static">
		<Toolbar
			className={classNames(classes.root, {
				[classes.highlight]: numSelected >0,
			})}
		>
			<div className={classes.title}>
				{numSelected > 0 ? (
					<Typography color="inherit" variant="subtitle1">
						{numSelected} selected
					</Typography>
				) : (
					<Typography variant="h6" id="tableTitle">
						Search Results: Guests
					</Typography>

				)}
			</div>
			<div className={classes.actions}>
				<Tooltip title="Add Guest">
					<IconButton aria-label="Add Guest">
						<NoteAddIcon />
					</IconButton>
				</Tooltip>
			</div>
		</Toolbar>
		</AppBar>
	);
};

EnhancedTableToolbar.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  container: {
  	display: 'flex',
  	flexWrap: 'wrap',
  },
  textField: {
  	marginLeft: theme.spacing.unit,
  	marginRight: theme.spacing.unit,
  },
  dense: {
  	marginTop: 16,
  },
  menu: {
  	width: 200,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});


class GuestEnhancedTable extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			order: 'asc',
			orderBy: 'firstname',
			selected: [],
			page: 0,
			rowsPerPage: 5,
			guestSearchPayload:{ 
        		searchterm: "",
        	},
        	data: [
        		createSampleData('Christian', 'Barnes', 80231, 34093537,0),
        		],
        	guestSearchFN : "",
        	guestSearchLN : "",
        	guestSearchZip : "",
        	guestSearchSP : "",
		}
	}

	handleRequestSort = (event,  property) => {
		const orderBy = property;
		let order ='desc';

		if(this.state.orderBy === property && this.state.order === 'desc') {
			order='asc';
		}

		this.setState({ order: orderBy });
	};

	handleSelectAllClick = event => {
		if (event.target.checked) {
			this.setState(state => ({ selected: state.data.map(n => n.id) }));
			return;
		}
		this.setState({ selected: [] });
	};

	handleClick = (event, id) => {
		const { selected } = this.state;
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length -1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex +1),
			);
		}

		this.setState({ selected: newSelected });
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	handleExpandoClick = event => {
		this.setState({ guestSelected: event.target.value });
	};

	getResult =  (query) =>{
		console.log("Posting Query:",query);
		axios.post(apiBaseUrl+'guestsearch', query)
			.then(function(response) {
				console.log(response);
		    	if (response.data.code == 200){
		      		console.log("Query completed.");
		      		//this.setstate({ results: response.data.results});}
		      		return(response);
		    	}
			})
			.catch(function(error) {
				console.log(error);
			})
	};

	isSelected = id => this.state.selected.indexOf(id) !== -1;

	handleGuestSearch = () => {
		this.setState({
			guestSearchPayload: {
				firstname: this.guestSearchFN,
				lastname: this.guestSearchLN,
				zipcode: this.guestSearchZip,
				seasonpass: this.guestSearchSP
			}
		});
		console.log("state at time of handleGuestSearch... ",this.state);

		axios.post(apiBaseUrl + 'guestsearch', this.guestSearchPayload)
			.then(function(response) {
				console.log(response);
				if (response.data.code == 200){
					console.log("Query completed");
					return(response)
				}
			})
			.catch(function(error){
				console.log(error);
			})
	};


	render() {
		const { classes } = this.props;
		const { query, order, orderBy, selected, rowsPerPage, page } = this.state;
		// var emptyRows = rowsPerPage - Math.min(rowsPerPage, this.data.length - page * rowsPerPage);
		var emptyRows = 0;


		return (
			<Paper className={classes.root}>
				<form className={classes.container} noValidate autoComplete="off">
					<TextField
						id="guestSearchFN"
						label="First Name"
						className={classes.textField}
						margin="normal"
						variant="outlined"
						onChange={(event) => this.setState({ guestSearchFN : event.target.value})}
					/>
					<TextField
						id="guestSearchLN"
						label="Last Name"
						className={classes.textField}
						value={this.state.searchLN}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						id="guestSearchZip"
						label="Zipcode"
						className={classes.textField}
						value={this.state.searchZC}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						id="guestSearchSP"
						label="Season Pass or Wristband ID"
						className={classes.textField}
						value={this.state.searchSP}
						margin="normal"
						variant="outlined"
					/>
					<Button variant="contained" size="small" className={classes.button} onClick={this.handleGuestSearch}>
						<SearchIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
						Search
					</Button>
				</form>
				<EnhancedTableToolbar numSelected={selected.length} />
				<div className={classes.tableWrapper}>
				<Table className={classes.table} aria-labelledby="tableTitle">
					<EnhancedTableHead
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={this.handleSelectAllClick}
						onRequestSort={this.handleRequestSort}
						rowCount={this.state.data.length}
					/>
					<TableBody>
						{this.state.data.map(n => {
								const isSelected = this.isSelected(n.id);
								return(
									<TableRow
										hover
										onClick={event => this.handleClick(event, n.id)}
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox checked={isSelected} />
										</TableCell>
										<TableCell component="th" scope="row" padding="none">
											{n.firstname}
										</TableCell>
										<TableCell>{n.lastname}</TableCell>
										<TableCell numeric>{n.zipcode}</TableCell>
										<TableCell>{n.seasonpass}</TableCell>
										<TableCell>{n.recoveries}</TableCell>
									</TableRow>
								);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 49 * emptyRows }}>
									<TableCell colSpan={6}>
										{this.state.data.length}
									</TableCell>
								</TableRow>
							)}
					</TableBody>
				</Table>
				</div>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, 50]}
					component="div"
					count={this.state.data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page',
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page',
					}}
					onChangePage={this.handleChangePage}
					onChangeRowsPerPage={this.handleChangeRowsPerPage}
				/>
			</Paper>
		);
	}

}

GuestEnhancedTable.propTypes = {
	classes: PropTypes.object.isRequired,
	results: PropTypes.array.isRequired
};

export default withStyles(styles)(GuestEnhancedTable);
