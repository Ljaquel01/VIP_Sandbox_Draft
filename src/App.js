import React, { Component } from "react";
import "./css/style.css";
import "./css/layout.css";
import RegisterScreen from "./components/RegisterScreen";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import Navbar from "./components/Navbar";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentScreen: "HomeScreen"
    };
  }

  goRegister = () => {
    this.setState({ currentScreen: "RegisterScreen" });
  };

  goLogin = () => {
    this.setState({ currentScreen: "LoginScreen" });
  };

  goHome = () => {
    this.setState({ currentScreen: "HomeScreen" });
  };

  renderSwitch = screen => {
    switch (screen) {
      case "RegisterScreen":
        return <RegisterScreen />;
      case "LoginScreen":
        return <LoginScreen />;
      case "HomeScreen":
        return <HomeScreen />;
      default:
        return <div>Error</div>;
    }
  };

  render() {
    return (
      <div>
        <Navbar
          goRegister={this.goRegister}
          goLogin={this.goLogin}
          goHome={this.goHome}
        />
        {this.renderSwitch(this.state.currentScreen)}
      </div>
    );
  }
}
