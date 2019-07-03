import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react/index";
import TableOfShipments from './../components/MainPage/TableOfShipments';

class DeletedShipmentsPage extends React.Component {
  render() {
    // let shipmentDetails = this.findCurrentShipmentInArray();

    return (
      <div onClick={() => this.props.changePage('all')}>sdfsdfsdf</div>
    );
  }
}

DeletedShipmentsPage = inject("store")(
  observer(
    DeletedShipmentsPage
  )
);

export default DeletedShipmentsPage;

DeletedShipmentsPage.propTypes = {

};
