import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import LineOfShipment from './LineOfShipment';
import SortNavigation from './SortNavigation';

export default class TableOfShipments extends React.Component {
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
      />)
  }

  render() {
    return (
      <table className="table table-striped table-sm App_table">
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

TableOfShipments.propTypes = {
  shipments: PropTypes.array,
  handleSortClick: PropTypes.func,
  sortCategory: PropTypes.string,
  sortDirection: PropTypes.string,
};
