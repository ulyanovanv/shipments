import React from 'react';
import PropTypes from 'prop-types';

export default function LineOfDeletedShipment(props) {
  let info = props.info;

  return (
    <tr className="App_table_shipment">
      <th className="p-2">{info.id}</th>
      <td>{info.name}</td>
      <td>{info.mode}</td>
      <td>{info.type}</td>
      <td>{info.origin}</td>
      <td>{info.destination}</td>
      <td className='position-relative'>
        <div
          className="App_table_shipment_status"
          style={{backgroundColor: '#000'}}
        > </div>
        <span className='ml-2'>
          {'deleted'.toUpperCase()}
        </span>
      </td>

    </tr>
  );
}

LineOfDeletedShipment.propTypes = {
  info: PropTypes.object,
  changePage: PropTypes.func,
  deleteShipment: PropTypes.func
};
