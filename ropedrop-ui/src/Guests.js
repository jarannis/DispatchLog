import React, { Component } from 'react';
import MuiThemeProvider from 'materal-ui/styles/MuiThemeProvider';
import AppBar from 'materal-ui/AppBar';
import RaisedButton from 'materal-ui/RaisedButton';
import TextField from 'materal-ui/TextField';
import axios from 'axios';

var apiBaseUrl = "http://localhost:31415/api/";
class Guests extends Component{
	constructor(props){
		super(props);
		this.state={
			query:'',
			results:'',
		}
	}

	render() {
		return (
			// Section open DIV
			<div>
			<MuiThemeProvider>
				<div>
				<AppBar
					title="Guest Search"
				/>
				<TextField
					hintText="Enter a guest's First Name, Last Name, or Season Pass number to search:"
					floatingLabelText="Query"
					onChange = {
						(event,newValue) => this.setState({query:newValue});
						refreshQuery();
					}
				/>
				</div>
			</MuiThemeProvider>
			</div>
		)
	}
	refreshQuery(event){
		var self = this;
		var payload={
			"query":this.state.query
		}
		axios.post(apiBaseUrl+'guestsearch', payload)
		.then(function(response) {
			console.log(response);
			// if the response completed correctly
			if (response.data.code = 200){
				console.log("Query Completed Successfully");
				// if the response comes back with results
				if (response.data.response.count >0){
					// modify the output to reflect the table, append not found, create button
				}
				// if it doesn't have any results...
				else {
					// append no results, create button
				}
			}
			// if the response didn't complete correctly
			else {
				// return a "something happened" error.
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}