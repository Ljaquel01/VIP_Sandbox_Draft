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
        <div className="row">
          <div className="column" style={{float: "left", width: "41%"}}>
            <div className="column_banner">
              <span>Portfolio</span>
            </div>
            <div style={{justifyContent: 'space-evenly'}}>
              {this.props.wireframes.map((wireframe)=>( <Tile wireframe={wireframe} goEditor={this.props.goEditor} /> ))}
            </div>
          </div>
          <div className="column" style={{float: "right", width: "55%"}}>
            <div className="column_banner">
              <span>Community Templates</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeScreen;
