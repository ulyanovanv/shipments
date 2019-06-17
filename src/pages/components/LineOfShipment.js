import React from 'react';
import PropTypes from 'prop-types';

export default function LineOfShipment(props) {
  return (
    <tr onClick={() => props.changePage(props.info.id)} className="App_table_shipment">
      <th scope="row">{props.info.id}</th>
      <td>{props.info.name}</td>
      <td>{props.info.mode}</td>
      <td>{props.info.type}</td>
      <td>{props.info.origin}</td>
      <td>{props.info.destination}</td>
      <td>{props.info.status}</td>
    </tr>
  );
}

LineOfShipment.propTypes = {
  info: PropTypes.object,
};
