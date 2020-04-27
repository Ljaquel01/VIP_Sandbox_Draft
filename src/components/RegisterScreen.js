import React, { Component } from "react";
import "../css/style.css";
import "../css/layout.css";

class RegisterScreen extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", width: "60%" }}>
          <div className="banner">
            <span>Wireframer</span>
            <br />
            <span style={{ fontSize: "20pt" }}>(Wolfie Tools Logo)</span>
          </div>
          <h1>Register</h1>
          <form style={{ textAlign: "left", paddingInline: "50px" }}>
            <div className="form-group" style={{ display: "flex" }}>
              <input
                className="textfield"
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="form-group" style={{ display: "flex" }}>
              <input
                className="textfield"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div className="form-group" style={{ display: "flex" }}>
              <input className="textfield" type="text" placeholder="Email" />
            </div>
            <div className="form-group" style={{ display: "flex" }}>
              <input className="textfield" type="text" placeholder="Password" />
            </div>
          </form>
          <button className="submit_button">Submit</button>
        </div>
      </div>
    );
  }
}
export default RegisterScreen;
