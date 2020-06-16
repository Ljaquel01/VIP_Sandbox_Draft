import React, { Component } from "react";
import "../css/style.css";
import "../css/layout.css";
import WLogo from "../../public/WLogo.jpg";

class Tile extends Component {
  render() {
    return (
      <div className="tile" onClick={this.props.goEditor} style={{cursor: "pointer"}}>
        <div className="tile_image">
          <img src={WLogo} alt="WLogo" className="tile_image_content" />
        </div>
        <span>{this.props.wireframe.name}</span>
      </div>
    );
  }
}
export default Tile;
