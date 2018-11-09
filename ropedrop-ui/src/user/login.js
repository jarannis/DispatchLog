import React, { Component } from 'react';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		
	}
	function submitLogin() {

	}



	render() {
		return (
			<div className=LoginForm>
				<header className="Login-Header">
					<form name="userAndPassForm">
						<p>
							Login to RopeDrop:
							Username: <input type="text" name="username" value=""/>
							Password: <input type="password" name="password" value=""/>
							<button onclick="submitLogin()">
								Login
							</button>
							<button onclick="forgotPassword()">
								Forgot Password
							</button>
					)
	}
}