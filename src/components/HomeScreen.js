import React, { Component } from "react";
import "../css/style.css";
import "../css/layout.css";
import Tile from "./Tile.js"

class HomeScreen extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", width: "100%", height: "10%" }}>
          <div className="banner">
            <span>Wireframer</span>
            <span style={{ fontSize: "10px" }}>by Wolfie Tools</span>
          </div>
        </div>
        <div class="row">
          <div class="column" style={{float: "left", width: "38%"}}>
            <div className="column_banner">
              <span>Portfolio</span>
            </div>
            
            <Tile/>
            <Tile/>
            <Tile/>
            <Tile/>

            
          </div>
          <div class="column" style={{float: "right", width: "58%"}}>
            <div className="column_banner">
              <span>Community Wireframes</span>
            </div>
            <Tile/>
            <Tile/>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeScreen;
