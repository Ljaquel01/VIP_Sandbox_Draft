import React, { Component } from "react";
import "../css/style.css";
import "../css/layout.css";

class Navbar extends Component {
  render() {
    return (
      <ul className="navbar">
        <li className="navbar_item" onClick={this.props.goHome}>Home</li>
        <li className="navbar_item" onClick={this.props.goRegister}>Register</li>
        <li className="navbar_item" onClick={this.props.goLogin}>Login</li>
        <li className="navbar_item" style={{ float: "right" }}>
          Account
        </li>
      </ul>
    );
  }
}
export default Navbar;
