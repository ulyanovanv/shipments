import React from 'react';
import PropTypes from 'prop-types';

function FormToChangeShipmentValue(props) {
  const inputElement = (
    <input
      type="text"
      className="form-control form-control-sm"
      id="inputPassword2"
      value={props.newValueForShipmentUpdate}
      placeholder={`New Value for ${props.keyValue}`}
      onChange={event => props.updateShipmentValue(event)}
      autoFocus
    />
  );

  const selectElement = (
    <select
      type="checkbox"
      className="form-control form-control-sm"
      id="inputPassword2"
      value={props.newValueForShipmentUpdate}
      onChange={event => props.updateShipmentValue(event)}
      autoFocus
    >
      {['', 'ordered', 'paid', 'enroute', 'delivered'].map(el => <option key={el}>{el}</option>)}
    </select>
  );

  const input = (props.keyValue === 'status') ? selectElement : inputElement;

  return (
    <form
      className="form-inline App_shipment-details_form"
      onBlur={event => props.submitFormForNewShipmentValue(event)}
    >
      <div className="form-group mr-3 mb-2">
        <label htmlFor="inputPassword2" className="sr-only">
          New Value for
          {props.keyValue}
        </label>
        { input }
      </div>
      <button
        type="submit"
        className="btn btn-sm btn-customized mb-2 ml-auto font-weight-bold"
        onClick={event => props.submitFormForNewShipmentValue(event)}
      >
        Save
      </button>
    </form>
  );
}

export default FormToChangeShipmentValue;

FormToChangeShipmentValue.propTypes = {
  newValueForShipmentUpdate: PropTypes.string,
  keyValue: PropTypes.string,
  updateShipmentValue: PropTypes.func,
  submitFormForNewShipmentValue: PropTypes.func,
};
