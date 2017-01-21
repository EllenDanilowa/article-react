import React, { Component } from 'react';
import { Link } from 'react-router';
import AuthService from '../services/AuthService';

class Login extends Component { 
	constructor() {
		super();

		this.state = {
			error: false,
			loggedIn: false
		}

		this.login = this.login.bind(this);
	}

	componentDidMount() {

		AuthService.loggedIn()
        .then((data) => {
            this.setState({
              loggedIn: data === 'true'
            }); 
         });
	}

	login(event) {
		event.preventDefault();

      	const self = this;
      	const username = self.refs.username.value;
      	const password = self.refs.password.value;

		AuthService.login(username, password)
			.then(() => {
				self.props.router.replace('/');
			}).catch((error) => {
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
		    			<h2 className="page-title">Login</h2>
				        <div className="login-form">
					        <form onSubmit={this.login}>
					            <div className="input-wrapper">
					            	<input id="username" ref="username" className="input" type='text' name='username' required=''/>
					            </div>
					            <div className="input-wrapper">
					            	<input id="password" className="input" ref="password" type='password' name='password' required='' placeholder='Password'/>
					            </div>
					            {this.state.error && (
		            				<p className="error-messsage">Bad login information</p>
		          				)}
					          	<input className="button" type='submit' value='Login'/>
					        </form>
				        </div>
				      	<p>
				      		<Link to={'/registration'}>Registration</Link>
				      	</p>
		    		</div>
		    	)}		        
		    </div>
		); 
	} 
} 

export default Login;