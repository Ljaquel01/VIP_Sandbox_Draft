import React, { Component } from "react";
import "../../css/style.css";
import "../../css/layout.css";

export const ElementsToAdd = {
  BOX: { width: "70px", height: "40px",
    backgroundColor: "#0000FF", borderStyle: "solid",
    borderColor: "#000000", borderRadius: "4%",
    borderWidth: "1px",fontColor: "#000000",
    fontSize: "12pt", text: ""
  },
  TEXTFIELD: { 
    width: "160px",
    height: "34px",
    backgroundColor: "white",
    border: "2px solid darkgray",
    boxShadow: "1px 1px 1px 0 lightgray inset", 
    text: "Input",
  },
  LABEL: {
    width: "160px",
    height: "34px",
    text: "Label...",
    fontWeight: "bold",
    textAlign: "center",
  },
}

export class LeftSideBar extends Component {
  render() {
    return (
      <div id="left_sidebar" className="sidebar"
      onMouseDown={() => this.props.unselect()}>
        <div
          className="box grabbable"
          draggable={true}
          onDragStart={e =>
            this.props.dragStartHandler(e, ElementsToAdd.BOX)
            }
        />
        <div
          className="textfield_element grabbable"
          draggable={true}
          onDragStart={e =>
            this.props.dragStartHandler(e, ElementsToAdd.TEXTFIELD)
            }
        > Input
        </div>
        <div
          className="label_element grabbable"
          draggable={true}
          onDragStart={e =>
            this.props.dragStartHandler(e, ElementsToAdd.LABEL)
            }
        > Label... </div>
      </div>
    )
  }
}
export default LeftSideBar;