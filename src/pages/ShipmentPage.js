import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react/index";

import ShipmentDetails from '../components/ShipmentPage/ShipmentDetails';

class ShipmentPage extends React.Component {
  constructor(props) {
    super(props);
  }

  findCurrentShipmentInArray() {
    return this.props.store.shipments.find(obj => obj.id === this.props.store.shipmentDetailsId);
  }

  render() {
    let shipmentDetails = this.findCurrentShipmentInArray();

    return (
      <Fragment>
        <h5 className='my-3'>Details of the shipment <b>{shipmentDetails.id}</b>.</h5>
        <ShipmentDetails
          shipmentDetails={shipmentDetails}
        />
        <button
          type="button"
          className="btn btn-sm btn-customized mt-2 font-weight-bold"
          onClick={() => this.props.changePage()}
        >
          Back to Main Page
        </button>
      </Fragment>
    );
  }
}

ShipmentPage = inject("store")(
  observer(
    ShipmentPage
  )
);

export default ShipmentPage;

ShipmentPage.propTypes = {
  changePage: PropTypes.func,
};

