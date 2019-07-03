import React from 'react';

import './App.scss';
import MainPage from './pages/MainPage';
import ShipmentPage from './pages/ShipmentPage';
import DeletedShipmentsPage from './pages/DeletedShipmentsPage';
import SidebarMenu from "./components/SidebarMenu";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNavBar: 'all',
      openPage: 'all'
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage(page) {
    this.setState({
      openPage: page,
      activeNavBar: page === 'shipment' ? 'all' : page
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="App row">
          <SidebarMenu
            active={this.state.activeNavBar}
            changePage={this.changePage}
          />
          <div className="col-md-9 App_main-page">
            {this.state.openPage === 'all' && <MainPage
              changePage={this.changePage}
            />}
            {this.state.openPage === 'shipment' && <ShipmentPage
              changePage={this.changePage}
            />}
            {this.state.openPage === 'deleted' && <DeletedShipmentsPage
              changePage={this.changePage}
            />}
          </div>
        </div>
      </div>
    );
  }
}
