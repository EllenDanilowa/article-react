import React, { Component } from 'react';
import config from '../configs/config.json';
import { Link } from 'react-router';
import AuthService from '../services/AuthService';

class Articles extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loggedIn: false
        };
    }

    componentDidMount() {
        fetch(`${config.apiUrl}articles`)
            .then((response) => response.json())
            .then((articles) => {
                this.setState({
                    articles: articles
                });
            });

        AuthService.loggedIn()
        .then((data) => {
            this.setState({
              loggedIn: data === 'true'
            }); 
         })
    }

    render() {
      return (
        <div>
          {!this.state.loggedIn ? (
              <Link to={'/login'}>Login</Link>
          ) : (
              <div>
                  <Link className="link" to={'/new-article'}>Add new article</Link>
                  <Link className="link" to={'/logout'}>Logout</Link>
              </div>
          )}
          <h2 className="page-title">Last articles</h2>
          <div className="article-list">
          {this.state.articles.map((article, index) => {
            return <div className="article-list__item" key={index}>
                <h2 className="article-list__item__title">{article.title}</h2>
                 <p className="article-list__item__description">{article.description}</p>
                      <a className="link article-list__item__link" href={article.link}>Read more...</a>
                      <img className="article-list__item__image" src={"http://localhost:3001/uploads/"+article.imageHash} alt='alt' />
                      <div className="article-list__item__additional-information">
                          <span className="article-list__item__author">
                              <i className="icon icon-user"></i>
                              {article.author}
                          </span>
                          <span className="article-list__item__date">
                              <i className="icon icon-clock"></i>
                              {new Date(article.creation_date).toLocaleDateString()}
                          </span>
                      </div>
                </div>
            })}
          </div>
        </div>
      );
    }
}

export default Articles;