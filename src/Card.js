import React from 'react';
import {capitalizeFirstLetter, toTitleCase} from './helpers';


export default function Card({picture, name, location, phone, email}) {
  return (
    <div className="col-md-4 col-sm-6 col-xs-12">
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
}
