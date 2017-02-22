import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {capitalizeFirstLetter, toTitleCase} from './helpers'

class App extends Component {
  constructor() {
    super();
    this.state = { items: [] };
  }
  
  componentDidMount() {
    fetch(`https://randomuser.me/api/?results=12`) 
      .then(result => {
        // console.log(result);
        return result.json();
      })
      .then(d => {
        console.log(d.results);
        this.setState({items: d.results});
        // console.log(this.state.items);
      });  
  }

  renderItems(){
    this.state.items.map((item) => {
      return (
        <div key={item.id} >
          {item.name.first}
        </div>
      )
    });
  }

  render() {
    const renderItems = this.state.items.map((item) => {
      const {cell, picture, name, location, phone, email} = item;
      return (
        <div key={cell} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
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

    return (
      <div className="App">
        
        <div className="container">
          <div className="row">
            {renderItems}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
