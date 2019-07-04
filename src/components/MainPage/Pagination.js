import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { supportEvent } from '../../helpers/helperFunctions';

export default function Pagination(props) {
  const pagination = () => {
    const pages = [];
    for (let i = 1; i <= props.numberOfPages; i += 1) {
      pages.push(
        <li className={`page-item ${props.currentPage === i ? 'active' : ''}`} key={`pageNumber${i}`}>
          <span
            className="page-link text-secondary"
            onClick={() => props.changePageNumber(i)}
            onKeyDown={event => supportEvent(event, props.changePageNumber, i)}
            role="button"
            tabIndex="0"
          >
            {i}
          </span>
        </li>,
      );
    }

    return pages;
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <span
            className="page-link text-secondary"
            aria-label="Previous"
            onClick={() => props.changePageNumber('-')}
            onKeyDown={event => supportEvent(event, props.changePageNumber, '-')}
            role="button"
            tabIndex="0"
          >
            <span>&laquo;</span>
          </span>
        </li>
        <Fragment>
          {pagination()}
        </Fragment>
        <li className="page-item">
          <span
            className="page-link text-secondary"
            aria-label="Next"
            onClick={() => props.changePageNumber('+')}
            onKeyDown={event => supportEvent(event, props.changePageNumber, '+')}
            role="button"
            tabIndex="0"
          >
            <span>&raquo;</span>
          </span>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  numberOfPages: PropTypes.number,
  currentPage: PropTypes.number,
  changePageNumber: PropTypes.func,
};
