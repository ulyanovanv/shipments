import React from 'react';

export default class SidebarMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.active);
    let active = this.props.active === "all" ? 'active' : '';

    return (
      <aside className="App_sidebar p-3 col-2 d-flex flex-column">
        <h4 className="float-left">List of Shipments.</h4>

        <div className={"App_sidebar_tab px-3 mt-5 mb-1 " + (this.props.active === "all" ? 'active' : '')}> All shipments </div>
        <div className={"App_sidebar_tab px-3 " + (this.props.active !== "all" ? 'active' : '')}> Deleted shipments </div>
      </aside>
    );
  }
}