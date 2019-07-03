import React from 'react';
import PropTypes from 'prop-types';

export default class SidebarMenu extends React.Component {
  render() {
    let { active, changePage } = this.props;
    return (
      <aside className="App_sidebar p-3 col-md-3 d-flex flex-column">
        <h4 className="float-left">List of Shipments.</h4>

        <div
          className={"App_sidebar_tab px-3 mt-5 mb-1 " + (active === "all" ? 'active' : '')}
          onClick={() => changePage('all')}
        >
          All shipments
        </div>
        <div
          className={"App_sidebar_tab px-3 " + (active === "deleted" ? 'active' : '')}
          onClick={() => changePage('deleted')}
        >
          Deleted shipments
        </div>
      </aside>
    );
  }
}

SidebarMenu.propTypes = {
  active: PropTypes.string,
  changePage: PropTypes.func
};