import React from 'react';
import PropTypes from 'prop-types';
import { supportEvent } from '../helpers/helperFunctions';

export default function SidebarMenu(props) {
  const { active, changePage } = props;
  return (
    <aside className="App_sidebar p-3 col-md-2 d-flex flex-column">
      <h4 className="float-left">List of Shipments.</h4>

      <div
        className={`App_sidebar_tab px-3 mt-5 mb-1 ${active === 'all' ? 'active' : ''}`}
        onClick={() => changePage('all')}
        onKeyDown={event => supportEvent(event, changePage, 'all')}
        tabIndex="0"
        role="button"
      >
        All shipments
      </div>
      <div
        className={`App_sidebar_tab px-3 ${active === 'deleted' ? 'active' : ''}`}
        onClick={() => changePage('deleted')}
        onKeyDown={event => supportEvent(event, changePage, 'deleted')}
        tabIndex="0"
        role="button"
      >
        Deleted shipments
      </div>
    </aside>
  );
}

SidebarMenu.propTypes = {
  active: PropTypes.string,
  changePage: PropTypes.func,
};
