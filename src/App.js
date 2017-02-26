import React, { Component } from 'react';
import './App.css';
import {capitalizeFirstLetter, toTitleCase, range} from './helpers';


export default class App extends Component {
  state = { 
    items: [],
    pages: [1,2,3,4,5],
    currentPage: 1
  }

  updatePage = (e) => {
    e.preventDefault();

    const currentPage = this.state.currentPage;
    const toPage = Number(e.target.getAttribute('data-value'));
    let pages = this.state.pages;

    if(currentPage !== toPage){
      (toPage > 4 ) 
        ? pages = range((toPage - 2), (toPage + 2)) 
        : pages = [1,2,3,4,5];
    }

    fetch(`https://randomuser.me/api/?page=${toPage}&seed=same&results=6`) 
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

    fetch(`https://randomuser.me/api/?page=${toPage}&seed=same&results=6`) 
      .then(result => {
        return result.json();
      })
      .then(d => {
        this.setState({items: d.results});
      });
  }

  render() {
    const {currentPage, pages} = this.state;

    const renderItems = this.state.items.map((item) => {
      const {cell, picture, name, location, phone, email} = item;
      return (
        <div key={cell} className="col-md-4 col-sm-6 col-xs-12">
          <div className="thumbnail">
            <img src={picture.large} className="img-circle shadow-light" alt=".." />
            <div className="caption">
              <h3>{capitalizeFirstLetter(name.first)} {capitalizeFirstLetter(name.last)}</h3>
              <h5>{toTitleCase(`${location.city}, ${location.state}`)} <br/>
                {location.street}
              </h5>
              <h5><span className="glyphicon glyphicon-phone" aria-hidden="true"></span> {phone}</h5>              
              <a href={`mailto:${email}`} target="_top"><span className="btn btn-info glyphicon glyphicon-envelope" aria-hidden="true"></span></a>
            </div>
          </div>
        </div>
      )
    });

    const paginationNum = pages.map((item)=>{
      return  (
        <li key={item} className={(currentPage === item) ? "active" : null}>
          <a onClick={this.updatePage}
              data-value={item}
              href="#">{item}
          </a>
        </li>
      );
    });

    return (
      <div className="App">        
        <div className="container">
          <h3>ReactJS, Fetch API, Random User Generator, Pagination</h3>

          <ul className="pagination">
            <li>
              <a onClick={this.updatePage} data-value={currentPage > 1 ? currentPage - 1 : 1} href="#" aria-label="Previous">&laquo;</a>
            </li>
            {paginationNum}
            <li>
              <a onClick={this.updatePage} data-value={currentPage > 0 ? currentPage + 1 : 1} href="#" aria-label="Next">&raquo;</a>
            </li>
          </ul>

          <div className="row">
            {renderItems}
          </div>
          <div className="author">Made with <span className="text-danger">♥</span> by <a href="http://dankoknad.github.io/" target="_blank">Danko</a></div>  
        </div>
      </div>
    );
  }
}
