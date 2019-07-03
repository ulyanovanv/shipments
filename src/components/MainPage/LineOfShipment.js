import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react/index";

import pencil from '../../images/pencil.png';
import basket from '../../images/basket.png'

const COLORS = {
  ordered: '#fc79ba',
  paid: '#dd006e',
  enroute: '#a80556',
  delivered: '#57002b'
};

function LineOfShipment(props) {
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
          style={{backgroundColor: COLORS[info.status]}}
        > </div>
        <span className='ml-2'>
          {info.status.toUpperCase()}
        </span>
      </td>
      <td className="tool">
        <div
          onClick={() => props.changePage('shipment', info.id)}
          className="pencil"
        >
          <img src={pencil} />
        </div>
      </td>
      <td className="tool">
        <div
          onClick={() => props.deleteShipment(info.id)}
          className="basket"
        >
          <img src={basket} />
        </div>
      </td>
    </tr>
  );
}

LineOfShipment = inject("store")(
  observer(
    LineOfShipment
  )
);

export default LineOfShipment;

LineOfShipment.propTypes = {
  info: PropTypes.object,
  changePage: PropTypes.func,
  deleteShipment: PropTypes.func
};
