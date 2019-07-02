import React from 'react';
import PropTypes from 'prop-types';

export default function FormToChangeShipmentValue(props) {
  return (
    <form className="form-inline App_shipment-details_form">
      <div className="form-group mr-3 mb-2">
        <label htmlFor="inputPassword2" className="sr-only">New Value for {props.fieldToChange}</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="inputPassword2"
          placeholder={`New Value for ${props.fieldToChange}`}
          onChange={(event) => props.updateShipmentValue(event)}
          tabIndex={props.isFormForValueChangeShown ? 0 : ''}
        />
      </div>
      <button
        type="submit"
        className="btn-customized mb-2 ml-auto"
        onClick={(event) => props.submitFormForNewShipmentValue(event)}
      >
        Save
      </button>
    </form>
  );
}

FormToChangeShipmentValue.propTypes = {
  updateShipmentValue: PropTypes.func,
  submitFormForNewShipmentValue: PropTypes.func,
  fieldToChange: PropTypes.string,
  isFormForValueChangeShown: PropTypes.bool,
};
