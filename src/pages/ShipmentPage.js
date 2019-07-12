import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';

import ShipmentDetails from '../components/ShipmentPage/ShipmentDetails';
import BackButton from '../components/MainPage/BackButton';

function ShipmentPage(props) {
  const shipmentDetails = props.store.findCurrentShipment;

  return (
    <Fragment>
      <h5 className="my-3">
        Details of the shipment
        {' '}
        <b>{shipmentDetails.id}</b>
.
      </h5>
      <ShipmentDetails
        shipmentDetails={shipmentDetails}
      />
      <BackButton changePage={props.changePage} />
    </Fragment>
  );
}

ShipmentPage = inject('store')(
  observer(
    ShipmentPage,
  ),
);

export default ShipmentPage;

ShipmentPage.propTypes = {
  changePage: PropTypes.func,
  store: PropTypes.shape({
    shipments: PropTypes.array,
    shipmentDetailsId: PropTypes.string,
    findCurrentShipment: PropTypes.object,
  }),
};
