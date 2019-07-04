import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import desc from '../../images/desc.png';
import asc from '../../images/asc.png';
import sort from '../../images/sort.png';

export default function SortNavigation(props) {
  const tableHeaders = ['id', 'name', 'mode', 'type', 'origin', 'destination', 'status', '', ''];

  const sortSymbol = (el) => {
    if (el !== props.sortCategory) {
      return {
        img: sort,
        alt: 'sort',
      };
    }

    return {
      img: props.sortDirection === 'asc' ? desc : asc,
      alt: props.sortDirection === 'asc' ? 'descading order' : 'asceding order',
    };
  };

  return (
    <tr>
      {tableHeaders.map((el) => {
        if (el.length === 0) {
          return <th key={shortid.generate()} />;
        }

        return (
          <th
            className="pl-2 App_table_head-item"
            scope="col"
            onClick={() => props.handleSortClick(el)}
            key={shortid.generate()}
          >
            <span
              className={el === props.sortCategory ? 'App_active-filter' : ''}
            >
              {el}
              {' '}
            </span>
            <img
              className="App_table_sort_img"
              src={sortSymbol(el).img}
              alt={sortSymbol(el).alt}
              title={sortSymbol(el).alt}
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
