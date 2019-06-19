import React from 'react';
import PropTypes from 'prop-types';

export default function FormToChangeShipmentValue(props) {
  return (
    <form className="form-inline">
      <div className="form-group mx-sm-3 mb-2">
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
        className="btn btn-secondary btn-sm mb-2"
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
