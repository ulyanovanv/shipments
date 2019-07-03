import React from 'react';
import PropTypes from 'prop-types';

import Pagination from './Pagination';

export default function SearchTool(props) {
  return (
    <div className='App_navigation d-flex justify-content-between align-items-baseline mx-auto'>
      <h5>{props.title}</h5>
      {props.numberOfPages > 1 && <div className='App_navigation_nav mt-2'>
        <Pagination
          numberOfPages={props.numberOfPages}
          currentPage={props.currentPage}
          changePageNumber={props.changePageNumber}
        />
      </div>}
      <div className="App_navigation_input input-group input-group-sm my-3">
        <div className="input-group-prepend">
          <span className="App_navigation_label input-group-text">Seacrh by ID</span>
        </div>
        <input
          type="text"
          aria-label="First name"
          className="form-control"
          onChange={(event) => props.handleSearchIdChange(event)}
        />
      </div>
    </div>
  );
}

SearchTool.propTypes = {
  handleSearchIdChange: PropTypes.func,
  title: PropTypes.string
};
