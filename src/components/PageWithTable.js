import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';

import TableOfShipments from './MainPage/TableOfShipments';
import SearchTool from './MainPage/SearchTool';
import Pagination from './MainPage/Pagination';
import { sortByKey, calculateNewPageNumber, calculateNumberOfPages } from '../helpers/helperFunctions';

const ASC = 'asc';
const DESC = 'desc';
const SHIPMENTS_PER_PAGE = 20;

class PageWithTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      sortCategory: 'id',
      sortDirection: ASC,
      searchId: '',
    };

    this.changePageNumber = this.changePageNumber.bind(this);
    this.paginate = this.paginate.bind(this);
    this.handleSearchIdChange = this.handleSearchIdChange.bind(this);
    this.sortByField = this.sortByField.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
    this.goToShipmentPage = this.goToShipmentPage.bind(this);
    this.deleteShipment = this.deleteShipment.bind(this);
    this.calculateShipments = this.calculateShipments.bind(this);
  }

  // functions as response to the events
  changePageNumber(operator) {
    const { numberOfPages } = this.calculateShipments(this.props.shipments);

    this.setState(prevState => ({
      currentPage: calculateNewPageNumber(operator, prevState.currentPage, numberOfPages),
    }));
  }

  handleSortClick(sortCategory) {
    let sortDirection = '';
    if (sortCategory !== this.state.sortCategory) {
      sortDirection = ASC;
    } else {
      sortDirection = this.state.sortDirection === ASC ? DESC : ASC;
    }

    this.setState({
      sortCategory,
      sortDirection,
    });
  }

  handleSearchIdChange(event) {
    this.setState({
      searchId: event.target.value,
      currentPage: 1,
    });
  }

  goToShipmentPage(page, id) {
    this.props.store.setSelectedShipmentId(id);
    this.props.changePage(page);
  }

  // functions to influence on displayed shipments
  sortByField(givenShipments, sortCategory, sortDirection) {
    const shipments = sortByKey(givenShipments.slice(), sortCategory);

    if (sortDirection === DESC) {
      shipments.reverse();
    }

    return shipments;
  }

  paginate(shipments, page) {
    const serialNumberOfFirstShipment = SHIPMENTS_PER_PAGE * (page - 1);

    return shipments.slice(serialNumberOfFirstShipment, serialNumberOfFirstShipment + SHIPMENTS_PER_PAGE);
  }

  filterShipments(shipments, searchId) {
    return shipments.filter(el => el.id.substr(0, searchId.length) === searchId);
  }

  deleteShipment(id) {
    this.props.store.deleteShipment(id);
  }

  // main function to reform displayed shipments
  calculateShipments(givenShipments) {
    let shipments = this.filterShipments(givenShipments, this.state.searchId);


    const numberOfPages = calculateNumberOfPages(shipments, SHIPMENTS_PER_PAGE);

    shipments = this.sortByField(shipments, this.state.sortCategory, this.state.sortDirection);
    shipments = this.paginate(shipments, this.state.currentPage);
    return { shipments, numberOfPages };
  }

  render() {
    const { shipments, numberOfPages } = this.calculateShipments(this.props.shipments);

    return (
      <Fragment>
        <SearchTool
          handleSearchIdChange={this.handleSearchIdChange}
          title={this.props.title}
          numberOfPages={numberOfPages}
          currentPage={this.state.currentPage}
          changePageNumber={this.changePageNumber}
        />
        <TableOfShipments
          shipments={shipments}
          handleSortClick={this.handleSortClick}
          sortCategory={this.state.sortCategory}
          sortDirection={this.state.sortDirection}
          goToShipmentPage={this.goToShipmentPage}
          deleteShipment={this.deleteShipment}
          tableLineComponent={this.props.tableLineComponent}
        />
        {numberOfPages > 1
        && (
        <Pagination
          numberOfPages={numberOfPages}
          currentPage={this.state.currentPage}
          changePageNumber={this.changePageNumber}
        />
        )
        }
      </Fragment>
    );
  }
}

PageWithTable = inject('store')(
  observer(
    PageWithTable,
  ),
);

export default PageWithTable;

PageWithTable.propTypes = {
  shipments: PropTypes.arrayOf(PropTypes.object),
  changePage: PropTypes.func,
  store: PropTypes.shape({
    setShipments: PropTypes.func,
    setSelectedShipmentId: PropTypes.func,
    deleteShipment: PropTypes.func,
  }),
  title: PropTypes.string,
  tableLineComponent: PropTypes.string,
};
