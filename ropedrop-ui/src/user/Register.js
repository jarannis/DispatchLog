import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from '../Login';

class Register extends Component {
	constructor(props){
		super(props);
		this.state={
			first_name:'',
			last_name:'',
			email:'',
			password:''
		}
	}
	render() {
		return (
			<div>
				<MuiThemeProvider>
					<div>
					<AppBar
						title="Register"
					/>
					<TextField
						hintTest="Enter your First Name"
						floatingLabelText="First Name"
						onChange = {(event,newValue) => this.setState({first_name:newValue})}
					/>
					<br/>
					<TextField
						hintText="Enter your Last Name"
						floatingLabelText="Last Name"
						onChange = {(event,newValue) => this.setState({last_name:newValue})}
					/>
					<br/>
					<TextField
						hintText="Enter your Radio Callsign"
						floatingLabelText="Callsign"
						onChange = {(event,newValue) => this.setState({callsign:newValue})}
					/>
					<br/>
					<TextField
						hintText="Enter your Department Code"
						floatingLabelText="Department Code"
						onChange = {(event,newValue) => this.setState({deptCode:newValue})}
					/>
					<br/>
					<TextField
						hitText="Enter your Area Code"
						floatingLabelText="Area Code"
						onChange = {(event,newValue) => this.setState({areaCode:newValue})}
					/>
					<br/>
					<TextField
						hintText="Pick a Username"
						floatingLabelText="Username"
						onChange = {(event,newValue) => this.setState({username:newValue})}
					/>
					<br/>
					<TextField
						hintText="Enter your Email"
						type="email"
						floatingLabelText="Email"
						onChange = {(event,newValue) => this.setState({emailAddress:newValue})}
					/>
					<br/>
					<TextField
						type = "password"
						hintText="Enter your Password"
						floatingLabelText="Password"
						onChange = {(event,newValue) => this.setState({password:newValue})}
					/>
					<br/>
					<RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
					</div>
				</MuiThemeProvider>
			</div>
		);
	}
	handleClick(event){
	    var apiBaseUrl = "http://localhost:31415/api";
	    console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
	    //To be done:check for empty values before hitting submit
	    var self = this;
	    var payload={
	    	"first_name": this.state.first_name,
	    	"last_name":this.state.last_name,
	    	"callsign":this.state.callsign,
	    	"deptCode":this.state.deptCode,
	    	"areaCode":this.state.areaCode,
	    	"username":this.state.username,
	    	"emailAddress":this.state.emailAddress,
	    	"password":this.state.password
	    }
	    axios.post(apiBaseUrl+'/register', payload)
	   .then(function (response) {
	    	console.log(response);
	    	if(response.data.code == 200){
	      		//  console.log("registration successfull");
	      		var loginscreen=[];
	       		loginscreen.push(<Login parentContext={this}/>);
	       		var loginmessage = "Not Registered yet.Go to registration";
	       		self.props.parentContext.setState({loginscreen:loginscreen,
	       			loginmessage:loginmessage,
	       			buttonLabel:"Register",
	       			isLogin:true
	        	});

	     	}
	     })
	   .catch(function (error) {
	     console.log(error);
	   });
	}
}

const style = {
	margin:15,
};



export default Register;