import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

export default function SortNavigation(props) {
  let tableHeaders = ['id', 'name', 'mode', 'type', 'origin', 'destination', 'status'];

  return (
    <tr>
      {tableHeaders.map(el =>
        <th className={el === props.sortCategory ? "App_active-filter" : ""}
            scope="col"
            onClick={() => props.handleSortClick(el)}
            key={shortid.generate()}
        >
          {el}{" "}
          {el === props.sortCategory &&
            <div className={props.sortDirection === 'asc' ? "asc" : "desc"}></div>
          }
        </th>)
      }
    </tr>
  );
}

SortNavigation.propTypes = {
  sortCategory: PropTypes.string,
  handleSortClick: PropTypes.func,
  sortDirection: PropTypes.string,
};