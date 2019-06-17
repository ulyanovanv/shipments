import React from 'react';
import { Provider } from "mobx-react";

import './App.scss';
import MainPage from './pages/MainPage';
import ShipmentPage from './pages/ShipmentPage';
import ShipmentsStore from './store/ShipmentsStore';

const store = new ShipmentsStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMainPage: true
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage() {
    this.setState({isMainPage: !this.state.isMainPage})
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          {this.state.isMainPage && <MainPage
            changePage={this.changePage}
          />}
          {!this.state.isMainPage && <ShipmentPage
            changePage={this.changePage}
          />}
        </div>
      </Provider>
    );
  }
}
