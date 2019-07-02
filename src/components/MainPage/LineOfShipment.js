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

class LineOfShipment extends React.Component {
  render() {
    let props = this.props.info;
    return (
      <tr className="App_table_shipment">
        <th className="p-2">{props.id}</th>
        <td>{props.name}</td>
        <td>{props.mode}</td>
        <td>{props.type}</td>
        <td>{props.origin}</td>
        <td>{props.destination}</td>
        <td className='position-relative'>
          <div
            className="App_table_shipment_status"
            style={{backgroundColor: COLORS[props.status]}}
          > </div>
          <span className='ml-2'>
            {props.status.toUpperCase()}
          </span>
        </td>
        <td className="tool">
          <div
            onClick={() => this.props.changePage(props.id)}
            className="pencil"
          >
            <img src={pencil} />
          </div>
        </td>
        <td className="tool">
          <div
            onClick={() => this.props.deleteShipment(props.id)}
            className="basket"
          >
            <img src={basket} />
          </div>
        </td>
      </tr>
    );
  }
}

LineOfShipment = inject("store")(
  observer(
    LineOfShipment
  )
);

export default LineOfShipment;

LineOfShipment.propTypes = {
  info: PropTypes.object,
};
