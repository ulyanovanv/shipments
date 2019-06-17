import React from 'react';
import PropTypes from 'prop-types';

export default function SearchTool(props) {
  return (
    <div className="App_navigation ml-auto my-3">
      <div className="input-group input-group-sm">
        <div className="input-group-prepend">
          <span className="input-group-text">Seacrh by ID</span>
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
