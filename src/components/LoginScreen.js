import React, { Component } from "react";
import "../css/style.css";
import "../css/layout.css";

class LoginScreen extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", width: "60%" }}>
          <div className="banner" style={{ marginTop: "60px" }}>
            <span>Wireframer</span>
          </div>
          <h1>Login</h1>
          <form style={{ textAlign: "left", paddingInline: "50px" }}>
            <div className="form-group" style={{ display: "flex" }}>
              <input className="textfield" type="text" placeholder="Email" />
            </div>
            <div className="form-group" style={{ display: "flex" }}>
              <input className="textfield" type="text" placeholder="Password" />
            </div>
          </form>
          <button className="submit_button" onClick={this.props.toggleLoggedIn}>Submit</button>
          <button className="submit_button" onClick={this.props.toggleLoginOption}>
            Don't have an account? Register here!</button>
        </div>
      </div>
    );
  }
}
export default LoginScreen;
