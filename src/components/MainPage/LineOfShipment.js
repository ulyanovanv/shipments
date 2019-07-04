import React from 'react';
import PropTypes from 'prop-types';

import pencil from '../../images/pencil.png';
import basket from '../../images/basket.png';
import { supportEvent } from '../../helpers/helperFunctions';

const COLORS = {
  ordered: '#fc79ba',
  paid: '#dd006e',
  enroute: '#a80556',
  delivered: '#57002b',
};

export default function LineOfShipment(props) {
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
          style={{ backgroundColor: COLORS[info.status] }}
        />
        <span className="ml-2">
          {info.status.toUpperCase()}
        </span>
      </td>
      <td className="tool">
        <div
          onClick={() => props.goToShipmentPage('shipment', info.id)}
          onKeyDown={event => supportEvent(event, props.goToShipmentPage, 'shipment', info.id)}
          className="pencil"
          tabIndex="0"
          role="button"
        >
          <img src={pencil} alt="pencil" title="modify" />
        </div>
      </td>
      <td className="tool">
        <div
          onClick={() => props.deleteShipment(info.id)}
          onKeyDown={event => supportEvent(event, props.deleteShipment, info.id)}
          tabIndex="0"
          className="basket"
          role="button"
        >
          <img src={basket} alt="basket" title="delete" />
        </div>
      </td>
    </tr>
  );
}


LineOfShipment.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string,
    mode: PropTypes.string,
    type: PropTypes.string,
    origin: PropTypes.string,
    destination: PropTypes.string,
    id: PropTypes.string,
    status: PropTypes.string,
  }),
  deleteShipment: PropTypes.func,
  goToShipmentPage: PropTypes.func,
};
