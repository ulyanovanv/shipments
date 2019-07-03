import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import pencil from '../../images/pencil.png';
import FormToChangeShipmentValue from './FormToChangeShipmentValue';

export default class Shipment extends React.Component {
  prepairShipmentsValuesForRender(shipmentValue) {
    return shipmentValue.map((infoPiece, index) => {
      let shipmentValueDetails = [];

      let entries =  Object.entries(infoPiece);

      for (let i = 0; i < entries.length; i++) {
        shipmentValueDetails.push(
          <span key={entries[i][0]}>
            {`${entries[i][0]} - ${entries[i][1]}`}
            {i + 1 < entries.length ? ', ' : ''}
          </span>
        );
      }

      return <Fragment key={index + 1}>
        <i>{index + 1}{'. '}</i>
        {shipmentValueDetails}
        <br/>
      </Fragment>;
    });
  }

  render() {
    let {props} = this;
    let shipmentValue = props.shipmentValue;

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

          {(!props.shouldFormBeShown && props.keyValue !== 'id') && <div
            className="float-right pencil"
            onClick={() => props.showFormForValueChange(props.keyValue)}>
            <img src={pencil}/>
          </div>}

          {props.shouldFormBeShown && <FormToChangeShipmentValue
            newValueForShipmentUpdate = {props.newValueForShipmentUpdate}
            keyValue={props.keyValue}
            updateShipmentValue={props.updateShipmentValue}
            submitFormForNewShipmentValue={props.submitFormForNewShipmentValue}
          />}
        </div>
      </div>
    );
  }
}

Shipment.propTypes = {
  shipmentValue: PropTypes.string,
  keyValue: PropTypes.string,
  shouldFormBeShown: PropTypes.bool,
  showFormForValueChange: PropTypes.func,
  newValueForShipmentUpdate: PropTypes.string,
  updateShipmentValue: PropTypes.func,
  submitFormForNewShipmentValue: PropTypes.func,
};
