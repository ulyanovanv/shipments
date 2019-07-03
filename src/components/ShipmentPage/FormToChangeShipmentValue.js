import React from 'react';
import PropTypes from 'prop-types';

class FormToChangeShipmentValue extends React.Component {
  render() {
    let inputElement = <input
      type="text"
      className="form-control form-control-sm"
      id="inputPassword2"
      value={this.props.newValueForShipmentUpdate}
      placeholder={`New Value for ${this.props.keyValue}`}
      onChange={(event) => this.props.updateShipmentValue(event)}
    />;

    let selectElement = <select
      type="checkbox"
      className="form-control form-control-sm"
      id="inputPassword3"
      value={this.props.newValueForShipmentUpdate}
      onChange={(event) => this.props.updateShipmentValue(event)}
    >
      {['', 'ordered', 'paid', 'enroute', 'delivered'].map(el => <option key={el}>{el}</option>)}
    </select>;

    let input = (this.props.keyValue === 'status') ? selectElement : inputElement;

    return (
      <form className="form-inline App_shipment-details_form">
        <div className="form-group mr-3 mb-2">
          <label htmlFor="inputPassword2" className="sr-only">New Value for {this.props.keyValue}</label>
          { input }
        </div>
        <button
          type="submit"
          className="btn-customized mb-2 ml-auto"
          onClick={(event) => this.props.submitFormForNewShipmentValue(event)}
        >
          Save
        </button>
      </form>
    );
  }
}

export default FormToChangeShipmentValue;

FormToChangeShipmentValue.propTypes = {
  newValueForShipmentUpdate: PropTypes.string,
  keyValue: PropTypes.string,
  updateShipmentValue: PropTypes.func,
  submitFormForNewShipmentValue: PropTypes.func,
};
