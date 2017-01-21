import React, { Component } from 'react';
import { Link } from 'react-router';
import AuthService from '../services/AuthService';

class Registration extends Component { 
	constructor() {
		super();
		this.state = {
			error: false,
			loggedIn: AuthService.loggedIn()
		}

		this.register = this.register.bind(this);
	}

	register(event) {
		event.preventDefault();

      	const username = this.refs.username.value;
      	const password = this.refs.password.value;

		AuthService.register(username, password)
			.then(() => {
				this.props.router.replace('/login')
			})
			.catch((error) => {
				this.setState({
					error: true
				})
			});
	}

	render() { 
		return (
		    <div>
			    {this.state.loggedIn ? (
			    		<div>
			    			<p>You are logged in now</p>
			    			<Link to={'/'}>Home page</Link>
			    		</div>
			    	) : (
			    		<div>
			    			<h2 className="page-title">Registration</h2>
					        <div className="login-form">
						        <form onSubmit={this.register}>
						            <div className="input-wrapper">
						            	<input id="username" ref="username" className="input" type='text' name='username' required=''/>
						            </div>
						            <div className="input-wrapper">
						            	<input id="password" className="input" ref="password" type='password' name='password' required='' placeholder='Password'/>
						            </div>
						            {this.state.error && (
			            				<p className="error-messsage">Bad information</p>
			          				)}
						          	<input className="button" type='submit' value='Registration'/>
						        </form>
					        </div>
					      	<p>
					      		<Link to={'/Login'}>or login</Link>
					      	</p>
			    		</div>
			    		)}
		    </div>
		); 
	} 
} 

export default Registration;