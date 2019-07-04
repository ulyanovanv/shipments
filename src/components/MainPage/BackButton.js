import React from 'react';
import PropTypes from 'prop-types';

export default function BackButton(props) {
  return (
    <button
      className="btn btn-sm btn-customized mt-3 mb-1 font-weight-bold"
      onClick={() => props.changePage('all')}
      type="button"
    >
      Back to Main Page
    </button>
  );
}

BackButton.propTypes = {
  changePage: PropTypes.func,
};
