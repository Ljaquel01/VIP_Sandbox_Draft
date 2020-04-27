import React, { Component } from "react";
import "./css/style.css";
import "./css/layout.css";
import RegisterScreen from "./components/RegisterScreen";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentScreen: "RegisterScreen"
    };
  }

  render() {
    switch (this.state.currentScreen) {
      case "RegisterScreen":
        return <RegisterScreen />;
      case "LoginScreen":
        return <LoginScreen />;
      case "HomeScreen":
        return <HomeScreen />;
      default:
        return <div>Error</div>;
    }
  }
}
