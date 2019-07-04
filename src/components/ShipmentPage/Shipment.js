import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import pencil from '../../images/pencil.png';
import FormToChangeShipmentValue from './FormToChangeShipmentValue';
import { supportEvent } from '../../helpers/helperFunctions';

export default class Shipment extends React.Component {
  constructor(props) {
    super(props);

    this.showFormForValueChange = this.showFormForValueChange.bind(this);
  }

  prepairShipmentsValuesForRender(shipmentValue) {
    return shipmentValue.map((infoPiece, index) => {
      const shipmentValueDetails = [];

      const entries = Object.entries(infoPiece);

      for (let i = 0; i < entries.length; i += 1) {
        shipmentValueDetails.push(
          <span key={entries[i][0]}>
            {`${entries[i][0]} - ${entries[i][1]}`}
            {i + 1 < entries.length ? ', ' : ''}
          </span>,
        );
      }

      return (
        <Fragment key={`${index}_2`}>
          <i>
            {index + 1}
            {'. '}
          </i>
          {shipmentValueDetails}
          <br />
        </Fragment>
      );
    });
  }

  showFormForValueChange(keyValue) { // TODO: fix
    // console.log(keyValue);
    this.props.showFormForValueChange(keyValue);
  }

  render() {
    const { props } = this;
    let { shipmentValue } = props;

    if (typeof shipmentValue === 'object') {
      shipmentValue = this.prepairShipmentsValuesForRender(shipmentValue);
    }

    return (
      <div className="d-flex flex-row mb-1">
        <div className="App_shipment-details_key px-1">
          {props.keyValue}
        </div>

        <div className="App_shipment-details_value px-1">
          {!props.shouldFormBeShown && shipmentValue}

          {(!props.shouldFormBeShown && props.keyValue !== 'id') && (
          <div
            className="float-right pencil"
            onClick={() => this.showFormForValueChange(props.keyValue)}
            onKeyDown={event => supportEvent(event, this.showFormForValueChange, props.keyValue)} // TODO: fix
            tabIndex="0"
            role="button"
          >
            <img src={pencil} alt="pencil" title="modify" />
          </div>
          )}

          {props.shouldFormBeShown && (
          <FormToChangeShipmentValue
            newValueForShipmentUpdate={props.newValueForShipmentUpdate}
            keyValue={props.keyValue}
            updateShipmentValue={props.updateShipmentValue}
            submitFormForNewShipmentValue={props.submitFormForNewShipmentValue}
            shipmentValue={shipmentValue}
          />
          )}
        </div>
      </div>
    );
  }
}

Shipment.propTypes = {
  shipmentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  keyValue: PropTypes.string,
  shouldFormBeShown: PropTypes.bool,
  showFormForValueChange: PropTypes.func,
  newValueForShipmentUpdate: PropTypes.string,
  updateShipmentValue: PropTypes.func,
  submitFormForNewShipmentValue: PropTypes.func,
};
