import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react/index";

import TableOfShipments from '../components/MainPage/TableOfShipments';
import SearchTool from '../components/MainPage/SearchTool';
import Pagination from '../components/MainPage/Pagination';
import {sortByKey, calculateNewPageNumber, calculateNumberOfPages} from '../helpers/helperFunctions';

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

  //functions as response to the events
  changePageNumber(operator) {
    let { numberOfPages } = this.calculateShipments(this.props.shipments);
    let nextPage = calculateNewPageNumber(operator, this.state.currentPage, numberOfPages);

    this.setState({
      currentPage: nextPage
    });
  }

  handleSortClick(sortCategory) {
    let sortDirection = '';
    if (sortCategory !== this.state.sortCategory) {
      sortDirection = ASC;
    } else {
      sortDirection = this.state.sortDirection === ASC ? DESC : ASC;
    }

    this.setState({
      sortCategory: sortCategory,
      sortDirection: sortDirection
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

  //functions to influence on displayed shipments
  sortByField(shipments, sortCategory, sortDirection) {
    shipments = sortByKey(shipments.slice(), sortCategory);

    if (sortDirection === DESC) {
      shipments.reverse();
    }

    return shipments;
  }

  paginate(shipments, page) {
    let serialNumberOfFirstShipment = SHIPMENTS_PER_PAGE * (page - 1);

    return shipments.slice(serialNumberOfFirstShipment, serialNumberOfFirstShipment + SHIPMENTS_PER_PAGE)
  }

  filterShipments(shipments, searchId) {
    return shipments.filter(el => {
      return el.id.substr(0, searchId.length) === searchId;
    });
  }

  deleteShipment(id) {
    this.props.store.deleteShipment(id);
  }

  // main function to reform displayed shipments
  calculateShipments(shipments) {
    shipments = this.filterShipments(shipments, this.state.searchId);
    shipments = this.sortByField(shipments, this.state.sortCategory, this.state.sortDirection);

    let numberOfPages = calculateNumberOfPages(shipments, SHIPMENTS_PER_PAGE);

    shipments = this.paginate(shipments, this.state.currentPage);
    return {shipments, numberOfPages};
  }

  render() {
    let { shipments, numberOfPages } = this.calculateShipments(this.props.shipments);

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
        {numberOfPages > 1 &&
        <Pagination
          numberOfPages={numberOfPages}
          currentPage={this.state.currentPage}
          changePageNumber={this.changePageNumber}
        />
        }
      </Fragment>
    );
  }
}

PageWithTable = inject("store")(
  observer(
    PageWithTable
  )
);

export default PageWithTable;

PageWithTable.propTypes = {
  changePage: PropTypes.func,
  store: PropTypes.shape({
    shipments: PropTypes.array,
    setShipments: PropTypes.func,
    setSelectedShipmentId: PropTypes.func,
    deleteShipment: PropTypes.func
  }),
  title: PropTypes.string
};