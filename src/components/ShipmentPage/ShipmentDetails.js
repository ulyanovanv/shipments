import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react/index";

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
    this.setState({key: key});
  }

  updateShipmentValue(event) {
    console.log(event.target.value);
    this.setState({newValueForShipmentUpdate: event.target.value});
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
      newValueForShipmentUpdate: ''
    });
  }

  findCurrentShipmentInArray() {
    return this.props.store.shipments.find(obj => obj.id === this.props.store.shipmentDetailsId);
  }

  render() {
    let arrayOfInfo = [];
    let shipmentDetails = this.props.shipmentDetails;

    for (let key in shipmentDetails) {
      arrayOfInfo.push(
        <Shipment
          key = {key}
          keyValue = {key}
          shouldFormBeShown = {key === this.state.key}
          newValueForShipmentUpdate = {this.state.newValueForShipmentUpdate}
          shipmentValue={shipmentDetails[key]}
          showFormForValueChange={this.showFormForValueChange}
          updateShipmentValue={this.updateShipmentValue}
          submitFormForNewShipmentValue={this.submitFormForNewShipmentValue}
        />
      )
    }

    return (
      <div className="App_shipment-details d-flex flex-column mx-auto p-3 text-left bg-light">
        {arrayOfInfo}
      </div>
    );
  }
}

ShipmentDetails = inject("store")(
  observer(
    ShipmentDetails
  )
);

export default ShipmentDetails;

ShipmentDetails.propTypes = {
  showFormForValueChange: PropTypes.func,
  shipmentDetails: PropTypes.object,
};
