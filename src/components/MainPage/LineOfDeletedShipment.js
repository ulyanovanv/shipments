import React from 'react';
import PropTypes from 'prop-types';

export default function LineOfDeletedShipment(props) {
  const { info } = props;

  return (
    <tr className="App_table_shipment">
      <th className="p-2">{info.id}</th>
      <td>{info.name}</td>
      <td>{info.mode}</td>
      <td>{info.type}</td>
      <td>{info.origin}</td>
      <td>{info.destination}</td>
      <td className="position-relative">
        <div
          className="App_table_shipment_status"
          style={{ backgroundColor: '#000' }}
        />
        <span className="ml-2">
          {'deleted'.toUpperCase()}
        </span>
      </td>

    </tr>
  );
}

LineOfDeletedShipment.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string,
    mode: PropTypes.string,
    type: PropTypes.string,
    origin: PropTypes.string,
    destination: PropTypes.string,
    id: PropTypes.string,
  }),
};
