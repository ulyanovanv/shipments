import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import desc from './../../images/desc.png';
import asc from './../../images/asc.png';
import sort from './../../images/sort.png';

export default function SortNavigation(props) {
  let tableHeaders = ['id', 'name', 'mode', 'type', 'origin', 'destination', 'status', '', ''];

  let sortSymbol = (el) => {
    if (el !== props.sortCategory) {
      return sort;
    }

    return props.sortDirection === 'asc' ? desc : asc;
  };

  return (
    <tr>
      {tableHeaders.map(el => {
        if (el.length === 0) {
          return <th></th>;
        }

        return (
          <th className="pl-2"
              scope="col"
              onClick={() => props.handleSortClick(el)}
              key={shortid.generate()}
          >
            <span
              className={el === props.sortCategory ? "App_active-filter" : ""}>
              {el}{" "}
            </span>
            <img
              className="App_table_sort_img"
              src={sortSymbol(el)}
            />
          </th>
        );
        })
      }
    </tr>
  );
}

SortNavigation.propTypes = {
  sortCategory: PropTypes.string,
  handleSortClick: PropTypes.func,
  sortDirection: PropTypes.string,
};