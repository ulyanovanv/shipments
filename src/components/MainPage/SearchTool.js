import React from 'react';
import PropTypes from 'prop-types';

export default function SearchTool(props) {
  return (
    <div className='App_navigation d-flex justify-content-between align-items-center mx-auto'>
      <h5>All shipments</h5>
      <div className="App_navigation_input input-group input-group-sm my-3">
        <div className="input-group-prepend">
          <span className="App_navigation_label input-group-text">Seacrh by ID</span>
        </div>
        <input
          type="text"
          aria-label="First name"
          className="form-control"
          onChange={(event) => props.searchById(event)}
        />
      </div>
    </div>
  );
}

SearchTool.propTypes = {
  searchById: PropTypes.func,
};
