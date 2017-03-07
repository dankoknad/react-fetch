import React, { Component } from 'react';
import './app.css';
import {range} from './helpers';
import Card from './Card';
import Pagination from './Pagination';


export default class App extends Component {
  state = { 
    items: [],
    pages: [1,2,3,4,5],
    currentPage: 1
  }

  updatePage = (e) => {
    e.preventDefault();

    let {pages, currentPage} = this.state;
    const toPage = Number(e.target.getAttribute('data-value'));

    if(currentPage !== toPage){
      (toPage > 4 ) 
        ? pages = range((toPage - 2), (toPage + 2)) 
        : pages = [1,2,3,4,5];
    }

    fetch(`https://randomuser.me/api/?page=${toPage}&seed=qwer&results=6`) 
      .then(result => {
        return result.json();
      })
      .then(d => {
        this.setState({
          items: d.results,
          pages,
          currentPage: toPage
        });
      });
  }

  componentDidMount() {
    const toPage = this.state.currentPage;

    fetch(`https://randomuser.me/api/?page=${toPage}&seed=qwer&results=6`) 
      .then(result => {
        return result.json();
      })
      .then(d => {
        this.setState({items: d.results});
      });
  }

  render() {
    const {currentPage, pages, items} = this.state;

    const renderCards = items.map((item) => {
      return (
        <Card key={item.login.username} {...item} />
      )
    });

    return (
      <div className="app">        
        <div className="container">
          <h3>ReactJS, Fetch API, Random User Generator, Pagination</h3>

          <Pagination
            updatePage={this.updatePage}
            currentPage={currentPage}
            pages={pages}
          />          

          <div className="row">
            {renderCards}
          </div>
          <div className="author">Made with <span className="text-danger">♥</span> by <a href="http://dankoknad.github.io/" target="_blank">Danko</a></div>  
        </div>
      </div>
    );
  }
}
