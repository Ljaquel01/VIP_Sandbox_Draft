import React, { Component } from "react";
import "../css/style.css";
import "../css/layout.css";

class Navbar extends Component {
  render() {
    return (
      <ul className="navbar">
        <li className="navbar_item" onClick={this.props.goHome}>
          Home
        </li>
        {this.props.loggedIn ? (
          <li
            className="navbar_item"
            onClick={this.props.toggleLoggedIn}
            style={{
              float: "right",
              borderRadius: "50%",
              backgroundColor: "blue",
              marginRight: 10
            }}
          >
            RM
          </li>
        ) : (
          <li
            className="navbar_item"
            onClick={this.props.toggleLoggedIn}
            style={{ float: "right" }}
          >
            Log In
          </li>
        )}
      </ul>
    );
  }
}
export default Navbar;
