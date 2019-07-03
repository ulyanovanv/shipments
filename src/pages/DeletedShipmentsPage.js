import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react/index";

import PageWithTable from './../components/PageWithTable';

class DeletedShipmentsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let deletedShipments = this.props.store.deletedShipments;

    if (deletedShipments.length > 0) {
      return <PageWithTable
        shipments={deletedShipments}
        changePage={this.props.changePage}
        tableLineComponent='LineOfDeletedShipment'
        title='Deleted shipments'
      />;
    }

    return (
      <div className='mt-3'>
        <h5> No deleted shipments are found.</h5>
        <div
          className='btn btn-sm btn-customized mt-3 mb-1'
          onClick={() => this.props.changePage('all')}
        >Back to All Shipments</div>
      </div>
    );
  }
}

DeletedShipmentsPage = inject("store")(
  observer(
    DeletedShipmentsPage
  )
);

export default DeletedShipmentsPage;

DeletedShipmentsPage.propTypes = {
  changePage: PropTypes.func,
  store: PropTypes.shape({
    deletedShipments: PropTypes.array
  })
};
