import React from 'react';

import './App.scss';
import MainPage from './pages/MainPage';
import ShipmentPage from './pages/ShipmentPage';
import SidebarMenu from "./components/SidebarMenu";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMainPage: true,
      activeNavBar: 'all'
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage() {
    this.setState({isMainPage: !this.state.isMainPage})
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="App row">
          <SidebarMenu active={this.state.activeNavBar}/>
          <div className="col-10 App_main-page">
            {this.state.isMainPage && <MainPage
              changePage={this.changePage}
            />}
            {!this.state.isMainPage && <ShipmentPage
              changePage={this.changePage}
            />}
          </div>
        </div>
      </div>
    );
  }
}
