import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import pencil from '../../images/pencil.png';
import FormToChangeShipmentValue from './FormToChangeShipmentValue';

export default class ShipmentDetails extends React.Component {
  prepairShipmentsValuesForRender(shipmentValue) {
    let arrayOfJsx = shipmentValue.map((infoPiece, index) => {
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

    return arrayOfJsx;
  }

  render() {
    let shipmentValue = this.props.shipmentValue;

    if (typeof shipmentValue === 'object') {
      shipmentValue = this.prepairShipmentsValuesForRender(shipmentValue);
    }

    return (
      <div className="d-flex flex-row mb-1">
        <div className="App_shipment-details_key px-1">
          {this.props.keyValue}
        </div>
        <div className="App_shipment-details_value px-1">
          {!this.props.shouldFormBeShown && shipmentValue}

          {(!this.props.shouldFormBeShown && this.props.keyValue !== 'id') && <div
            className="float-right pencil"
            onClick={() => this.props.showFormForValueChange(this.props.keyValue)}>
            <img src={pencil}/>
          </div>}

          {this.props.shouldFormBeShown && <FormToChangeShipmentValue
            updateShipmentValue={this.props.updateShipmentValue}
            submitFormForNewShipmentValue={this.props.submitFormForNewShipmentValue}
          />}
        </div>
      </div>
    );
  }
}

