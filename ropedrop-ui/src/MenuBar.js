import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import { lighten, fade } from '@material-ui/core/styles/colorManipulator';
import Loginscreen from './Loginscreen';
import GuestEnhancedTable from './GuestSearchScreen';
// import NavList from '/NavList';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class ButtonAppBar extends React.Component {
	state = {
		open: false,
		loggedIn: false,
		curPage: this.props.curPage,
		homeSelected: false,
		guestSearchSelected: false,
		loginSelected: false,
		recoveriesSelected: false,
		content:[],
		loginPage:[],
		homePage: [],
		guestSearchPage:[],
		activeQuery: "",
		curTitle: "",
	};
	handleDrawerOpen = () => {
		this.setState({ open:true });
	};
	handleDrawerClose = () => {
		this.setState({ open:false });
	};

	setSelected = () => {
		switch(this.state.curPage){
			case "home":
				this.setState({ homeSelected: true, guestSearchSelected: false, recoveriesSelected:false, loginSelected: false, curTitle: "Home", });
				break;
			case "guestSearch":
				this.setState({ homeSelected: false, guestSearchSelected: true, recoveriesSelected: false, loginSelected: false, curTitle: "Search Guests", });
				break;
			case "recoveriesSearch":
				this.setState({ homeSelected: false, guestSearchSelected: false, recoveriesSelected: true, loginSelected: false, curTitle: "Search Recoveries/Will Call" });
				break;
			case "login":
				this.setState({ homeselected: false, guestSearchSelected: false, recoveriesSelected: false, loginSelected: true, curTitle: "Login", });
				break;
		}
	};

	handleHomeNav = () => {
		this.setState({
			curPage: "home",
			homeSelected: true,
			guestSearchSelected: false,
			recoveriesSelected: false,
			loginSelected: false});
	};

	handleGuestSearchNav = () => {
		this.setState({
			curPage: "guestSearch",
			homeSelected: false,
			guestSearchSelected: true,
			recoveriesSelected: false,
			loginSelected: false,
			content: this.state.guestSearchPage,});
	};

	handleRecoveriesSearchNav = () => {
		this.setState({
			curPage: "recoveriesSearch",
			homeSelected: false,
			guestSearchSelected: false,
			recoveriesSelected: true,
			loginSelected: false});
	};

	handleLoginNav = () => {
		this.setState({
			curPage: "login",
			homeSelected: false,
			guestSearchSelected: false,
			recoveriesSelected: false,
			loginSelected: true,
			content: this.state.loginPage,
		})
	}

	handleNewQuery = (query) => {
		console.log("New Query from Search Box: ", query);
		switch(this.state.curPage){
			case "guestSearch":
				console.log("guestSearch page is open, forwarding query to page...");
				this.state.guestSearchPage = [];
				this.state.guestSearchPage.push(<GuestEnhancedTable parentContext={this} query={query} />);
				break;
			case "recoveriesSearch":
				break;
			default:
				console.log("No page defined... query changed to ",query," but not sent to page");
				break;

		}
	}

	componentWillMount(){
		var loginPage = [];
		var guestSearchPage = [];
		guestSearchPage.push(<GuestEnhancedTable parentContext={this} query={this.state.activeQuery} />);
		loginPage.push(<Loginscreen parentContext={this}/>);
		this.setState({
			loginPage:loginPage,
			guestSearchPage:guestSearchPage,
		});
		this.setSelected();
	};

	render() {
		const { classes } = this.props;
		

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar 
					position="absolute"
					className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
				>
					<Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
						<IconButton 
							className={classNames(
								classes.menuButton, this.state.open && classes.menuButtonHidden,
							)}
							color="inherit"
							aria-label="Menu"
							onClick={this.handleDrawerOpen}
							>
							<MenuIcon />
						</IconButton>

						<Typography 
							component="h1"
							variant="h6"
							color="inherit"
							noWrap 
							className={classes.title}
						>
							{this.state.curTitle}
						</Typography>
						<Button color="inherit"></Button>
						<div className={classes.spacer} />
						<div className={classes.grow} />
          				<div className={classes.search}>
            				<div className={classes.searchIcon}>
              					<SearchIcon />
            				</div>
    	    				<InputBase
              					placeholder="Search…"
              					classes={{
                					root: classes.inputRoot,
                					input: classes.inputInput,
              					}}
              					onChange={(event) => this.handleNewQuery(event.target.value)}
            				/>
          				</div>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					classes={{
						paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
					}}
					open={this.state.open}
				>
					<div className={classes.toolbarIcon}>
					 <IconButton onClick={this.handleDrawerClose}>
					 	<ChevronLeftIcon />
					 </IconButton>
					</div>
					<Divider />
					<List>	
						<div>
							<MenuItem selected={this.state.homeSelected} button onClick={this.handleHomeNav}>
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary="Home" />
							</MenuItem>
							<MenuItem selected={this.state.guestSearchSelected} button onClick={this.handleGuestSearchNav}>
								<ListItemIcon>
									<PeopleIcon />
								</ListItemIcon>
								<ListItemText primary="Search Guests" />
							</MenuItem>
							<MenuItem selected={this.state.recoveriesSelected} button onClick={this.handleRecoveriesSearchNav}>
								<ListItemIcon>
									<ShoppingCartIcon />
								</ListItemIcon>
								<ListItemText primary="Search Recoveries" />
							</MenuItem>
						</div>
					</List>
					<Divider />
					<List>
						<MenuItem selected={this.state.loginSelected} button onClick={this.handleLoginNav}>
							<ListItemIcon>
								<LockOpenIcon />
							</ListItemIcon>
							<ListItemText primary="Log Out" />
						</MenuItem>
					</List>
				</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				{this.state.content}
			</main>
		</div>
		);
	}
}


ButtonAppBar.propTypes ={
	classes:PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
