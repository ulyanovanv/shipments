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
      const entries = Object.entries(infoPiece);
      const shipmentValueDetails = [];

      for (let i = 0; i < entries.length; i += 1) {
        const [key, value] = entries[i];
        shipmentValueDetails.push(
          <span key={key}>
            {`${key} - ${value}`}
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

  showFormForValueChange(keyValue) {
    this.props.showFormForValueChange(keyValue);
  }

  render() {
    const {
      keyValue, shouldFormBeShown, updateShipmentValue, submitFormForNewShipmentValue, newValueForShipmentUpdate,
    } = this.props;

    let { shipmentValue } = this.props;

    if (typeof shipmentValue === 'object') {
      shipmentValue = this.prepairShipmentsValuesForRender(shipmentValue);
    }

    return (
      <div className="d-flex flex-row mb-1">
        <div className="App_shipment-details_key px-1">
          {keyValue}
        </div>

        <div className="App_shipment-details_value px-1">
          {!shouldFormBeShown && shipmentValue}

          {(!shouldFormBeShown && keyValue !== 'id') && (
          <div
            className="float-right pencil"
            onClick={() => this.showFormForValueChange(keyValue)}
            onKeyUp={(event) => {
              supportEvent(event, this.showFormForValueChange, keyValue);
              event.stopPropagation();
            }}
            tabIndex="0"
            role="button"
          >
            <img src={pencil} alt="pencil" title="modify" />
          </div>
          )}

          {shouldFormBeShown && (
          <FormToChangeShipmentValue
            newValueForShipmentUpdate={newValueForShipmentUpdate}
            keyValue={keyValue}
            updateShipmentValue={updateShipmentValue}
            submitFormForNewShipmentValue={submitFormForNewShipmentValue}
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
