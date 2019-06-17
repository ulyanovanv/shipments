import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react/index";

import FormToChangeShipmentValue from './components/FormToChangeShipmentValue';
import ShipmentDetails from './components/ShipmentDetails';

class ShipmentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormForValueChangeShown: false,
      fieldToChange: '',
      newValueForShipmentUpdate: '',
    };

    this.showFormForValueChange = this.showFormForValueChange.bind(this);
    this.updateShipmentValue = this.updateShipmentValue.bind(this);
    this.submitFormForNewShipmentValue = this.submitFormForNewShipmentValue.bind(this);
  }

  showFormForValueChange(key) {
    this.setState({isFormForValueChangeShown: !this.state.isFormForValueChangeShown, fieldToChange: key});
  }

  updateShipmentValue(event) {
    this.setState({newValueForShipmentUpdate: event.target.value});
  }

  submitFormForNewShipmentValue(event) {
    event.preventDefault();
    this.props.store.modifyShipments(
      this.findCurrentShipmentInArray().id,
      this.state.fieldToChange,
      this.state.newValueForShipmentUpdate,
    );

    this.setState({isFormForValueChangeShown: !this.state.isFormForValueChangeShown});
  }

  findCurrentShipmentInArray() {
    return this.props.store.shipments.find(obj => obj.id === this.props.store.shipmentDetailsId);
  }

  render() {
    let shipmentDetails = this.findCurrentShipmentInArray();

    return (
      <Fragment>
        <h4>Details of the shipment <i>{shipmentDetails.id}</i>.</h4>
        <ShipmentDetails
          showFormForValueChange={this.showFormForValueChange}
          shipmentDetails={shipmentDetails}
        />
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm mt-2"
          onClick={() => this.props.changePage()}
        >
          Back to Main Page
        </button>
        <div className="App_form-for-detail-change">
          {this.state.isFormForValueChangeShown &&
            <FormToChangeShipmentValue
              isFormForValueChangeShown={this.state.isFormForValueChangeShown}
              fieldToChange={this.state.fieldToChange}
              updateShipmentValue={this.updateShipmentValue}
              submitFormForNewShipmentValue={this.submitFormForNewShipmentValue}
            />
          }
        </div>
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

