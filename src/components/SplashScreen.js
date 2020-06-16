import React, { Component } from "react";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import "../css/style.css";
import "../css/layout.css";
import WireframePicture from "../../public/Wireframe.jpg";

class SplashScreen extends Component {
  constructor() {
    super();

    this.state = {
      loginOption: true
    };
  }

  toggleLoginOption = () => {
    this.setState({ loginOption: !this.state.loginOption });
  };

  render() {
    return (
      <div className="splash_row">
        <div className="splash_column" style={{ color: "rgb(64, 64, 64, 1)" }}>
          <h3>
            What is <b>Wireframer?</b>
          </h3>
          <p>
            Wireframer is a simple to use, yet powerful application for making
            wireframes/user interface mock-ups. Users can create wireframes
            through intuitive drag and drop controls, and can organize work into
            separate pages. Save your wireframes to our online database so you
            never lose your work! Share your wireframes with the world or just
            your friends! Export your work to a variety of file formats for your
            convenience!
          </p>
          <br />
          <img
            src={WireframePicture}
            alt="website logo"
            style={{ width: "50%", borderRadius: "4px", opacity: "0.9" }}
          />
          <br />
          <br />
          <b>And the best part: It is totally FREE!</b>
        </div>
        <div className="splash_column">
          {this.state.loginOption ? (
            <div>
              <LoginScreen toggleLoginOption={this.toggleLoginOption}
                toggleLoggedIn={this.props.toggleLoggedIn} />
            </div>
          ) : (
            <RegisterScreen toggleLoginOption={this.toggleLoginOption}
              toggleLoggedIn={this.props.toggleLoggedIn} />
          )}
        </div>
      </div>
    );
  }
}
export default SplashScreen;
