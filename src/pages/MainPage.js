import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { inject, observer } from 'mobx-react/index';

import PageWithTable from '../components/PageWithTable';

class MainPage extends React.Component {
  componentDidMount() {
    if (!this.props.store.shipments.length) {
      const thisApp = this;

      axios.get('http://localhost:3004/shipments')
        .then((response) => {
          thisApp.props.store.setShipments(response.data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }

  render() {
    return (
      <PageWithTable
        shipments={this.props.store.shipments}
        changePage={this.props.changePage}
        tableLineComponent="LineOfShipment"
        title="All shipments"
      />
    );
  }
}

MainPage = inject('store')(
  observer(
    MainPage,
  ),
);

export default MainPage;

MainPage.propTypes = {
  store: PropTypes.shape({
    shipments: PropTypes.array,
    setShipments: PropTypes.func,
  }),
  changePage: PropTypes.func,
};
