import React, { Component } from "react";
import "../../css/style.css";
import "../../css/layout.css";



export class LeftSideBar extends Component {
  render() {
    return (
      <div id="left_sidebar" className="sidebar"
      onMouseDown={() => this.props.unselect()}>
        <div
          className="box grabbable"
          draggable={true}
          onDragStart={e =>
            this.props.dragStartHandler(e, {
                width: "50px",
                height: "50px",
                backgroundColor: "#0000FF",
                fontColor: "#000000",
                fontSize: "12pt"
              })
            }
        />
        <div
          className="yellow_box grabbable"
          draggable={true}
          onDragStart={e =>
            this.props.dragStartHandler(e, {
              width: "75px",
              height: "40px",
              backgroundColor: "#FFFF00",
              borderStyle: "solid",
              borderColor: "#000000",
              borderRadius: "25%",
              borderWidth: "3px",
              text: ""
             })
            }
        />
      </div>
    )
  }
}
export default LeftSideBar;