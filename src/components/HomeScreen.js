import React, { Component } from "react";
import "../css/style.css";
import "../css/layout.css";
import Navbar from "./Navbar";

class HomeScreen extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Navbar />
        <div style={{ display: "inline-block", width: "100%", height: "10%" }}>
          <div className="banner">
            <span>Wireframer</span>
            <span style={{ fontSize: "8px" }}>by Wolfie Tools</span>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeScreen;
