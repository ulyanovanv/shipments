import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

export default function ShipmentDetails(props) {
  let prepairShipmentsValuesForRender = (shipmentValue) => {
    let arrayOfJsx = shipmentValue.map((infoPiece, index) => {
      let shipmentValueDetails = [];

      for (let key2 in infoPiece) {
        shipmentValueDetails.push(
          <span key={key2}>
            {`${key2} - ${infoPiece[key2]}`}
            <br/>
          </span>
        );
      }

      return <Fragment key={index + 1}>
        <i>{index + 1}{'. '}</i>
        {shipmentValueDetails}
      </Fragment>;
    });

    return arrayOfJsx;
  };

  let arrayOfInfo = [];
  let shipmentDetails = props.shipmentDetails;

  for (let key in shipmentDetails) {
    let changeableField = key === "name";
    let shipmentValue = shipmentDetails[key];

    if (typeof shipmentValue === 'object') {
      shipmentValue = prepairShipmentsValuesForRender(shipmentValue);
    }

    arrayOfInfo.push(
      <div className="d-flex flex-row">
        <div className="App_shipment-details_key px-1">
          {key}
        </div>
        <div className="App_shipment-details_value px-1">
          {shipmentValue}
          {changeableField && <input
            type="button"
            className="btn btn-outline-secondary btn-sm float-right"
            value="change"
            onClick={() => props.showFormForValueChange(key)}
          />}
        </div>
      </div>
    )
  }

  return (
    <div className="App_shipment-details d-flex flex-column mx-auto p-3 text-left bg-light">
      {arrayOfInfo}
    </div>
  );
}

ShipmentDetails.propTypes = {
  showFormForValueChange: PropTypes.func,
  shipmentDetails: PropTypes.object,
};
