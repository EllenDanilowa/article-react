import React, { Component } from 'react';
import { Link } from 'react-router';
import AuthService from '../services/AuthService';
import ArticleService from '../services/ArticleService';

class NewArticle extends Component { 
	constructor() {
		super();

		this.state = {
			loggedIn: false
		};
		this.addArticle = this.addArticle.bind(this);
		this.showPreviewImage = this.showPreviewImage.bind(this);
	}

	componentDidMount() {

		AuthService.loggedIn()
        .then((data) => {
            this.setState({
              loggedIn: data === 'true'
            }); 
         });
	}

	addArticle(event) {
		event.preventDefault();

		const article = new FormData(this.refs.form);

		ArticleService.addArticle(article)
			.then(()=> {
				this.props.router.replace('/');
			}).catch(() => {

			});
	}

	showPreviewImage(event) {
		this.setState({
			image: URL.createObjectURL(event.target.files[0])
		});
	}

	render() { 
		return (
			<div>
			{this.state.loggedIn ? (
				<div>
					<h2 className="page-title">New article</h2>
					<div className="article-form">
					    <form  ref="form" onSubmit={this.addArticle} encType="multipart/form-data">
					        <label htmlFor="title">Title:</label>
					        <div className="input-wrapper">
					            <input id="title" type="text" name="title" required="" placeholder="Title" className="input"/>
					        </div>
					        <label htmlFor="description">Description:</label>
					        <div className="input-wrapper">
					            <input id="description" type="text" name="description" required="" placeholder="Description" className="input"/>
					        </div>
					        <label htmlFor="link">Link:</label>
					        <div className="input-wrapper">
					            <input id="link" type="text" name="link" required="" placeholder="Link" className="input"/>
					        </div>
					        <label htmlFor="image">Image:</label>
					        <div className="input-wrapper">
					            <input id="image" type="file" name="image" required="" className="input-file" onChange={this.showPreviewImage}/>
					        </div>
					        {this.state.image && (
					        	<div className="image-preview-wrapper">
					        		<img className="image-preview-wrapper__image" src={this.state.image} alt="preview"/>
					        	</div>
					        )}
					        <input type="submit" value="Add article" className="button"/>
					    </form>
					</div>
				</div>
			) : (
				<div>
					You are not logged in.
					<Link to={'/login'}>Login</Link>
				</div>
			)}				
			</div>
		); 
	} 
} 

export default NewArticle;