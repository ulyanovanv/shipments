import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';

import PageWithTable from '../components/PageWithTable';
import BackButton from '../components/MainPage/BackButton';

function DeletedShipmentsPage(props) {
  const { deletedShipments } = props.store;

  if (deletedShipments.length > 0) {
    return (
      <PageWithTable
        shipments={deletedShipments}
        changePage={props.changePage}
        tableLineComponent="LineOfDeletedShipment"
        title="Deleted shipments"
      />
    );
  }

  return (
    <div className="mt-3">
      <h5> No deleted shipments are found.</h5>
      <BackButton changePage={props.changePage} />
    </div>
  );
}

DeletedShipmentsPage = inject('store')(
  observer(
    DeletedShipmentsPage,
  ),
);

export default DeletedShipmentsPage;

DeletedShipmentsPage.propTypes = {
  changePage: PropTypes.func,
  store: PropTypes.shape({
    deletedShipments: PropTypes.array,
  }),
};
