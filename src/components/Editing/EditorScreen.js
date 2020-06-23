import React, { Component } from "react";
import "../../css/style.css";
import "../../css/layout.css";
import PropertiesSideBar from "./PropertiesSideBar";

export class EditorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftSideBarVisible: true,
      rightSideBarVisible: true,
      elementSelected: false,
      elements: this.props.currentWireframe.elements
        ? this.props.currentWireframe.elements
        : []
    };
    this.mouseInWorkSpace = false;
    this.shiftX = 0;
    this.shiftY = 0;
  }

  mouseDownHandler = (event, element) => {
    event.stopPropagation();
    this.setState({ elementSelected: element });
  };

  dragStartHandler = (event, style) => {
    this.shiftX = event.pageX - event.target.getBoundingClientRect().left;
    this.shiftY = event.pageY - event.target.getBoundingClientRect().top;

    if (style) {
      console.log("style", style)
      event.dataTransfer.setData("element", JSON.stringify(style));
    }
    return false;
  }

  onDropHandler = event => {
    event.preventDefault();
    let elements = this.state.elements;
    // Get the adjusted x and y coordinates
    event.dataTransfer.dropEffect = this.mouseInWorkSpace ? "move" : "copy";
    let bounds = event.target.getBoundingClientRect();
    let x = event.clientX - bounds.left - this.shiftX;
    let y = event.clientY - bounds.top - this.shiftY;

    // TODO come up with better solution for this if statement (causes bugs)
    if (!this.mouseInWorkSpace) { 
      // Get the data sent of the element to add
      var data = JSON.parse(event.dataTransfer.getData("element"));

      // Create the new element with the data
      let newElement = {
        key: elements.length,
        left: parseInt(x, 10),
        top: parseInt(y, 10),
        ...data
      };

      // Update the state
      elements.push(newElement);
      this.setState(state => ({
        ...state,
        elementSelected: newElement,
        elements: elements
      }));
    } else {
      elements[this.state.elementSelected.key].left = parseInt(
        event.pageX - bounds.left - this.shiftX,
        10
      );
      elements[this.state.elementSelected.key].top = parseInt(
        event.pageY - bounds.top - this.shiftY,
        10
      );
      this.setState(state => ({
        ...state,
        elements: elements
      }));
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    //Here I am trying to Update localStorage after drop
    //We got to make sure we change this later, (make this 
    //general by adhering it to the save button action)
    ///////////////////////////////////////////////////
    let temp = localStorage.getItem("wireframes");
    temp = JSON.parse(temp);
    temp[0].elements = this.state.elements;
    temp = JSON.stringify(temp);
    localStorage.setItem("wireframes", temp);
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
  };

  onDragoverHandler = e => {
    e.preventDefault();
  };

  changeProperty = (property, value) => {
    console.log("Changing %s to %s", property, value);
    if (this.state.elementSelected) {
      let elements = this.state.elements;
      let ele = elements[this.state.elementSelected.key];
      ele[property] = value;
      this.setState({ elements: elements });
    }
  };

  render() {
    let elements = this.state.elements;
    console.log("elements:", elements);
    let elementSelected = this.state.elementSelected;
    let workspaceWidthPercent = 70.0;
    if (!this.state.leftSideBarVisible) workspaceWidthPercent += 15.0;
    if (!this.state.rightSideBarVisible) workspaceWidthPercent += 15.0;

    return (
      <div className="workspace_wrapper">
        {/* {this.state.leftSideBarVisible && (
          <div
            id="left_sidebar"
            className="sidebar"
            onClick={() => this.setState({ elementSelected: false })}
          >
            <div
              className="box grabbable"
              draggable={true}
              onDragStart={this.dragStartHandler}
            />
          </div>
        )} */}
        {this.state.leftSideBarVisible &&
          <div id="left_sidebar" className="sidebar" onMouseDown={() => this.setState({ elementSelected: false })}>
            <div className="box grabbable" draggable={true}
              onDragStart={(e) => this.dragStartHandler(e, { width: "50px", height: "50px", backgroundColor: "blue" })}></div>
            <div className="yellow_box grabbable" draggable={true}
              onDragStart={(e) => this.dragStartHandler(e, {
                width: "75px", height: "40px", backgroundColor: "yellow", borderStyle: "solid",
                borderColor: "black", borderRadius: "25%", borderWidth: "3px", text: ""
              })}></div>
          </div>}

        {/* <div
          className="edit_workspace"
          style={{ width: workspaceWidthPercent + "%" }}
          onMouseEnter={() => {
            this.mouseInWorkSpace = true;
          }}
          onMouseLeave={() => {
            this.mouseInWorkSpace = false;
          }}
          onDragOver={this.onDragoverHandler}
          onDrop={this.onDropHandler}
        >
          {elements &&
            elements.map(ele => (
              <div
                key={ele.key}
                onMouseDown={e => this.mouseDownHandler(e, ele)}
                draggable={true}
                onDragStart={this.dragStartHandler}
                className="grabbable"
                style={{ position: "absolute", ...ele }}
              />
            ))}
          <div
            id="left_sidebar_nub"
            className="sidebar_nub"
            onClick={() =>
              this.setState({
                leftSideBarVisible: !this.state.leftSideBarVisible
              })
            }
          />
          <div
            id="right_sidebar_nub"
            className="sidebar_nub"
            onClick={() =>
              this.setState({
                rightSideBarVisible: !this.state.rightSideBarVisible
              })
            }
          />
        </div> */}
        <div className="edit_workspace" style={{ width: workspaceWidthPercent + "%" }}
          onMouseEnter={() => { this.mouseInWorkSpace = true; }}
          onMouseLeave={() => { this.mouseInWorkSpace = false; }}
          onDragOver={this.onDragoverHandler}
          onDrop={this.onDropHandler}
          onMouseDown={() => this.setState({ elementSelected: false })}>
          {elements && elements.map((ele, index) => (
            ele === elementSelected ?
              <div key={index} style={{
                position: "absolute", height: (parseInt(ele.height, 10) + 4) + "px",
                width: (parseInt(ele.width, 10) + 4) + "px", backgroundColor: "#4286f4",
                top: (parseInt(ele.top, 10) - 2) + "px", left: (parseInt(ele.left, 10) - 2) + "px"
              }}>
                <div className="grabbable" key={index} draggable={true}
                  onMouseDown={(e) => this.mouseDownHandler(e, ele)}
                  onDragStart={this.dragStartHandler}
                  style={{
                    position: "relative", ...ele, top: "2px", left: "2px",
                  }}>{ele.text}</div>
                <div className='resizers'>
                  <div className='resizer top-left' draggable={true}
                    onMouseDown={(e) => e.stopPropagation()}
                    onDrag={() => console.log("drag")}
                    onDragStart={() => console.log("starting drag")} />
                  <div className='resizer top-right'></div>
                  <div className='resizer bottom-left'></div>
                  <div className='resizer bottom-right'></div>
                </div>
              </div> :
              <div key={index} onMouseDown={(e) => this.mouseDownHandler(e, ele)}
                draggable={true} onDragStart={this.dragStartHandler}
                className="grabbable" style={{ position: "absolute", ...ele }}>{ele.text}</div>
          ))}
          <div id="left_sidebar_nub" className="sidebar_nub"
            onClick={() => this.setState({ leftSideBarVisible: !this.state.leftSideBarVisible })}></div>
          <div id="right_sidebar_nub" className="sidebar_nub"
            onClick={() => this.setState({ rightSideBarVisible: !this.state.rightSideBarVisible })}></div>
        </div>

        {this.state.rightSideBarVisible && (
          <PropertiesSideBar
            elementSelected={elementSelected}
            changeProperty={this.changeProperty}
          />
        )}
      </div>
    );
  }
}
export default EditorScreen;
