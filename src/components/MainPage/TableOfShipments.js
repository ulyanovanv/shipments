import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react/index";

import LineOfShipment from './LineOfShipment';
import SortNavigation from './SortNavigation';

class TableOfShipments extends React.Component {
  constructor(props) {
    super(props);

    this.renderShipments = this.renderShipments.bind(this);
  }

  renderShipments() {
    return this.props.shipments.map(el =>
      <LineOfShipment
        info={el}
        key={shortid.generate()}
        changePage={this.props.changePage}
        deleteShipment={this.props.deleteShipment}
      />)
  }

  render() {
    return (
      <table className="table table-sm App_table mx-auto">
        <thead>
          <SortNavigation
            handleSortClick={this.props.handleSortClick}
            sortCategory={this.props.sortCategory}
            sortDirection={this.props.sortDirection}
          />
        </thead>
        <tbody>
          {this.renderShipments()}
        </tbody>
      </table>
    );
  }
}

TableOfShipments = inject("store")(
  observer(
    TableOfShipments
  )
);

export default TableOfShipments;

TableOfShipments.propTypes = {
  shipments: PropTypes.array,
  handleSortClick: PropTypes.func,
  changePage: PropTypes.func,
  deleteShipment: PropTypes.func,
  sortCategory: PropTypes.string,
  sortDirection: PropTypes.string
};
