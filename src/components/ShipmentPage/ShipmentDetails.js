import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';

import Shipment from './Shipment';

class ShipmentDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: '',
      newValueForShipmentUpdate: '',
    };

    this.showFormForValueChange = this.showFormForValueChange.bind(this);
    this.updateShipmentValue = this.updateShipmentValue.bind(this);
    this.submitFormForNewShipmentValue = this.submitFormForNewShipmentValue.bind(this);
  }

  showFormForValueChange(key) {
    this.setState({ key });
  }

  updateShipmentValue(event) {
    this.setState({ newValueForShipmentUpdate: event.target.value });
  }

  submitFormForNewShipmentValue(event) {
    event.preventDefault();
    this.props.store.modifyShipments(
      this.findCurrentShipmentInArray().id,
      this.state.key,
      this.state.newValueForShipmentUpdate,
    );

    this.setState({
      key: '',
      newValueForShipmentUpdate: '',
    });
  }

  findCurrentShipmentInArray() {
    return this.props.store.shipments.find(obj => obj.id === this.props.store.shipmentDetailsId);
  }

  render() {
    const arrayOfInfo = [];
    const { shipmentDetails } = this.props;

    const entries = Object.entries(shipmentDetails);

    for (let i = 0; i < entries.length; i += 1) {
      // console.log(entries[i][0]);
      // console.log(this.state.key);
      arrayOfInfo.push(
        <Shipment
          key={entries[i][0]}
          keyValue={entries[i][0]}
          shouldFormBeShown={entries[i][0] === this.state.key}
          newValueForShipmentUpdate={this.state.newValueForShipmentUpdate}
          shipmentValue={entries[i][1]}
          showFormForValueChange={this.showFormForValueChange}
          updateShipmentValue={this.updateShipmentValue}
          submitFormForNewShipmentValue={this.submitFormForNewShipmentValue}
        />,
      );
    }

    return (
      <div className="App_shipment-details d-flex flex-column mx-auto p-3 text-left bg-light">
        {arrayOfInfo}
      </div>
    );
  }
}

ShipmentDetails = inject('store')(
  observer(
    ShipmentDetails,
  ),
);

export default ShipmentDetails;

ShipmentDetails.propTypes = {
  shipmentDetails: PropTypes.shape({
    name: PropTypes.string,
    mode: PropTypes.string,
    type: PropTypes.string,
    origin: PropTypes.string,
    destination: PropTypes.string,
    id: PropTypes.string,
    status: PropTypes.string,
  }),
  store: PropTypes.shape({
    shipments: PropTypes.arrayOf(PropTypes.object),
    shipmentDetailsId: PropTypes.string,
    modifyShipments: PropTypes.func,
  }),
};
