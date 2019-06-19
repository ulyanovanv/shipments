import React from 'react';
import PropTypes from 'prop-types';

import pencil from '../../images/pencil.png';
import basket from '../../images/basket.png'

export default function LineOfShipment(props) {
  return (
    <tr className="App_table_shipment">
      <th className="p-2">{props.info.id}</th>
      <td>{props.info.name}</td>
      <td>{props.info.mode}</td>
      <td>{props.info.type}</td>
      <td>{props.info.origin}</td>
      <td>{props.info.destination}</td>
      <td>{props.info.status}</td>
      <td className="App_table_shipment_tool">
        <div
          onClick={() => props.changePage(props.info.id)}
          className="App_table_shipment_pencil"
        >
          <img src={pencil} />
        </div>
      </td>
      <td className="App_table_shipment_tool">
        <div
          onClick={() => {}}
          className="App_table_shipment_basket"
        >
          <img src={basket} />
        </div>
      </td>
    </tr>
  );
}

LineOfShipment.propTypes = {
  info: PropTypes.object,
};
