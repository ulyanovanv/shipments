import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {inject, observer} from "mobx-react/index";

import TableOfShipments from '../components/MainPage/TableOfShipments';
import SearchTool from '../components/MainPage/SearchTool';
import Pagination from '../components/MainPage/Pagination';
import {sortByKey, calculateNewPageNumber} from '../helpers/helperFunctions';

const ASC = 'asc';
const DESC = 'desc';
const SHIPMENTS_PER_PAGE = 20;

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shownShipments: [], // {SHIPMENTS_PER_PAGE} shipments per page, so now 20 per page
      numberOfPages:  1,
      currentPage: 1,
      sortCategory: 'id',
      sortDirection: ASC,
      searchId: '',
    };

    this.changePageNumber = this.changePageNumber.bind(this);
    this.showShipmentsOfCurrentPage = this.showShipmentsOfCurrentPage.bind(this);
    this.searchById = this.searchById.bind(this);
    this.sortByField = this.sortByField.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    if (this.props.store.shipments.length) {
      this.setState({numberOfPages: this.calculateNumberOfPages(this.props.store.shipments)});
      this.sortByField(this.state.sortCategory, this.state.sortDirection);
      return;
    }

    let thisApp = this;
    axios.get('http://localhost:3004/shipments')
      .then(function (response) {
        thisApp.setState({
          shownShipments: response.data, //bad practice to have loaded and changing shipments' list under one name
          numberOfPages: thisApp.calculateNumberOfPages(response.data)
        });

        thisApp.props.store.setShipments(response.data);
        thisApp.sortByField(thisApp.state.sortCategory, thisApp.state.sortDirection);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  calculateNumberOfPages(shipments = []) {
    return Math.ceil(shipments.length / SHIPMENTS_PER_PAGE);
  }

  changePageNumber(operator) {
    let nextPage = calculateNewPageNumber(operator, this.state.currentPage, this.state.numberOfPages);

    this.setState({currentPage: nextPage});
    this.sortByField(this.state.sortCategory, this.state.sortDirection, nextPage);
  }

  handleSortClick(sortCategory) {
    let sortDirection = '';
    if (sortCategory !== this.state.sortCategory) {
      sortDirection = ASC;
    } else {
      sortDirection = this.state.sortDirection === ASC ? DESC : ASC;
    }

    this.sortByField(sortCategory, sortDirection);
    this.setState({sortCategory: sortCategory, sortDirection: sortDirection});
  }

  sortByField(sortCategory, sortDirection, page = this.state.currentPage) {
    let shipments = sortByKey(this.props.store.shipments.slice(), sortCategory);

    if (sortDirection === DESC) {
      shipments.reverse();
    }

    if (this.state.searchId) {
      shipments = this.filterShipments(shipments, this.state.searchId);
    }

    if (page === undefined) {
      page = this.state.currentPage;
    }

    this.showShipmentsOfCurrentPage(shipments, page);
  }

  showShipmentsOfCurrentPage(shipments, page) {
    let serialNumberOfFirstShipment = SHIPMENTS_PER_PAGE * (page - 1);

    this.setState({shownShipments: shipments.slice(serialNumberOfFirstShipment, serialNumberOfFirstShipment + SHIPMENTS_PER_PAGE)});
  }

  filterShipments(shipments, searchId) {
    return shipments.filter(el => {
      return el.id.substr(0, searchId.length) === searchId;
    });
  }

  searchById(event) {
    let shipments = this.props.store.shipments.slice();

    let filteredShipments = this.filterShipments(shipments, event.target.value);

    this.setState({
      shownShipments: filteredShipments,
      numberOfPages: this.calculateNumberOfPages(filteredShipments),
      searchId: event.target.value,
      currentPage: 1,
    });
  }

  changePage(id) {
    this.props.store.setSelectedShipmentId(id);
    this.props.changePage();
  }

  render() {
    return (
      <Fragment>
        <SearchTool searchById={this.searchById}/>
        <TableOfShipments
          shipments={this.state.shownShipments}
          handleSortClick={this.handleSortClick}
          sortCategory={this.state.sortCategory}
          sortDirection={this.state.sortDirection}
          changePage={this.changePage}
        />
        {this.state.numberOfPages &&
          <Pagination
            numberOfPages={this.state.numberOfPages}
            currentPage={this.state.currentPage}
            changePageNumber={this.changePageNumber}
          />
        }
      </Fragment>
    );
  }
}

MainPage = inject("store")(
  observer(
    MainPage
  )
);

export default MainPage;

MainPage.propTypes = {
  changePage: PropTypes.func,
};