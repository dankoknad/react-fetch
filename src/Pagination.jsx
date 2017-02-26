import React, { Component } from 'react';

export default class Pagination extends Component {
  render(){
    const {currentPage, pages, updatePage} = this.props;

    const paginationNum = pages.map((item)=>{
      return  (
        <li key={item} className={(currentPage === item) ? "active" : null}>
          <a onClick={updatePage} data-value={item} href="#">{item} </a>
        </li>
      );
    });
    
    return (
      <ul className="pagination">
        <li>
          <a onClick={updatePage} data-value={currentPage > 1 ? currentPage - 1 : 1} href="#" aria-label="Previous">&laquo;</a>
        </li>
        {paginationNum}
        <li>
          <a onClick={updatePage} data-value={currentPage > 0 ? currentPage + 1 : 1} href="#" aria-label="Next">&raquo;</a>
        </li>
      </ul>
    )
  }
}
