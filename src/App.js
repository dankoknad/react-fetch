import React, { Component } from 'react';
import './App.css';
import {capitalizeFirstLetter, toTitleCase, range} from './helpers';


export default class App extends Component {
  constructor() {
    super();
    this.state = { 
      items: [],
      pages: [1,2,3,4,5],
      page: 1
    };

    this.fetchAPI = this.fetchAPI.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  fetchAPI(){
    setTimeout(() => {  
      const pageNum = this.state.page;

      fetch(`https://randomuser.me/api/?page=${pageNum}&seed=same&results=6`) 
        .then(result => {
          return result.json();
        })
        .then(d => {
          console.log(d.results);
          this.setState({items: d.results});
        });
    }, 0);
  }

  updatePage(e){
    const page = Number(e.target.getAttribute('data-value'));
    let pages = this.state.pages;

    (page > 3) 
      ? pages = range((page-2), (page+2)) 
      : pages = [1,2,3,4,5];

    console.log(page);
    console.log(pages);

    this.setState({page,pages});
    this.fetchAPI();
  }
  
  componentDidMount() {
    this.fetchAPI();
  }

  render() {
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

    const pages = this.state.pages.map((item, i)=>{
      return  (
        <li key={i} className={(this.state.page === item) ? "active" : ""}>
          <a  onClick={this.updatePage}
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
          <ul className="pagination">{pages} </ul>
          <div className="row">
            {renderItems}
          </div>
          <div className="author">Made with <span className="text-danger">♥</span> by <a href="http://dankoknad.github.io/" target="_blank">Danko</a></div>  
        </div>
      </div>
    );
  }
}
