import React, { Component } from "react";
import "./css/style.css";
import "./css/layout.css";
import HomeScreen from "./components/HomeScreen";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import EditorScreen from "./components/EditorScreen";
import WireframerData from "./data/WireframerData.json";

export default class App extends Component {
  constructor() {
    super();
    //localStorage.clear()
    let wireframes = localStorage.getItem("wireframes");
    if (!wireframes) {
      wireframes = JSON.stringify(WireframerData.wireframes);
      localStorage.setItem("wireframes", wireframes);
    }
    wireframes = JSON.parse(wireframes);

    this.state = {
      currentScreen: "Home",
      wireframes: wireframes,
      currentWireframe: null,
      loggedIn: false
    };
  }

  toggleLoggedIn = () => {
    this.setState({ loggedIn: !this.state.loggedIn });
  };
  goHome = () => {
    this.setState({ currentScreen: "Home", currentWireframe: null });
  };
  goEditor = () => {
    this.setState({
      currentScreen: "EditorScreen",
      currentWireframe: this.state.wireframes[0]
    });
  };

  renderSwitch = screen => {
    switch (screen) {
      case "Home":
        if (this.state.loggedIn)
          return (
            <HomeScreen
              goEditor={this.goEditor}
              wireframes={this.state.wireframes}
            />
          );
        else return <SplashScreen toggleLoggedIn={this.toggleLoggedIn} />;
      case "EditorScreen":
        if (this.state.loggedIn)
          return (
            <EditorScreen currentWireframe={this.state.currentWireframe} />
          );
        else return <SplashScreen toggleLoggedIn={this.toggleLoggedIn} />;
      default:
        return <div>Error</div>;
    }
  };

  render() {
    return (
      <div>
        <Navbar
          goHome={this.goHome}
          loggedIn={this.state.loggedIn}
          toggleLoggedIn={this.toggleLoggedIn}
        />
        {this.renderSwitch(this.state.currentScreen)}
      </div>
    );
  }
}
