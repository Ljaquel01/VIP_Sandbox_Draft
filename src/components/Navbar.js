import React, { Component } from "react";
import "../css/style.css";
import "../css/layout.css";

class Navbar extends Component {
  render() {
    return (
      <ul className="navbar">
        <li className="navbar_item">First</li>
        <li className="navbar_item">Second</li>
        <li className="navbar_item">Third</li>
        <li className="navbar_item" style={{ float: "right" }}>
          Account
        </li>
      </ul>
    );
  }
}
export default Navbar;
