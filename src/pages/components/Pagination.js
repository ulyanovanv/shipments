import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export default function Pagination(props) {
  let pagination = () => {
    let pages = [];
    for (let i = 1; i <= props.numberOfPages; i++) {
      pages.push(
        <li className={"page-item " + (props.currentPage === i ? "active" : "")} key={"pageNumber" + i}>
          <span className="page-link text-secondary"
             onClick={() => props.changePageNumber(i)}>
            {i}
          </span>
        </li>
      );
    }

    return pages;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {props.numberOfPages !== 1 &&
          <li className="page-item">
            <span className="page-link text-secondary" aria-label="Previous" onClick={() => props.changePageNumber("-")}>
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
        }
        {props.numberOfPages !== 1 &&
          <Fragment>
            {pagination()}
          </Fragment>
        }
        {props.numberOfPages !== 1 &&
          <li className="page-item">
            <span className="page-link text-secondary" aria-label="Next" onClick={() => props.changePageNumber("+")}>
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        }
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  numberOfPages: PropTypes.number,
  currentPage: PropTypes.number,
  changePageNumber: PropTypes.func,
};
