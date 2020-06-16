import React, { Component } from "react";
import "../css/style.css";
import "../css/layout.css";

export class EditorScreen extends Component {
  // render() {
  //   return (
  //     <div className="editor_row">
  //       <div className="tools">a</div>
  //       <div className="wireframe">b</div>
  //       <div className="properties">c</div>
  //     </div>
  //   );
  // }
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
    this.setState({ elementSelected: element });
  };

  dragStartHandler = event => {
    // if (this.mouseInWorkSpace) {
    //   var img = new Image();
    //   img.src = "transparent.png";
    //   event.dataTransfer.setDragImage(img, 0, 0);
    // }
    this.shiftX = event.pageX - event.target.getBoundingClientRect().left;
    this.shiftY = event.pageY - event.target.getBoundingClientRect().top;

    if (!this.mouseInWorkSpace) {
      let style = window.getComputedStyle(event.target);
      let obj = {
        width: style.width,
        height: style.height,
        backgroundColor: style.backgroundColor
      };
      event.dataTransfer.setData("element", JSON.stringify(obj));
    }
    return false;
  };

  onDropHandler = event => {
    event.preventDefault();
    let elements = this.state.elements;
    // Get the adjusted x and y coordinates
    event.dataTransfer.dropEffect = this.mouseInWorkSpace ? "move" : "copy";
    let bounds = event.target.getBoundingClientRect();
    let x = event.clientX - bounds.left - this.shiftX;
    let y = event.clientY - bounds.top - this.shiftY;

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
    // e.dataTransfer.dropEffect = "move";
    // if (this.state.elementSelected){
    //   let bounds = e.target.getBoundingClientRect();
    //   console.log(bounds.left, bounds.top)
    //   let x = e.pageX - bounds.left;
    //   let y = e.pageY - bounds.top;

    //   // let x = e.clientX;
    //   // let y = e.clientY;
    //   let ele = this.state.elementSelected
    //   ele.left = x;
    //   ele.top = y;
    //   this.setState(state => ({
    //     ...state,
    //     elementSelected: ele
    //   }));
    // }
  };

  render() {
    let elements = this.state.elements;
    let elementSelected = this.state.elementSelected;
    let workspaceWidthPercent = 70.0;
    if (!this.state.leftSideBarVisible) workspaceWidthPercent += 15.0;
    if (!this.state.rightSideBarVisible) workspaceWidthPercent += 15.0;

    return (
      <div className="workspace_wrapper">
        {this.state.leftSideBarVisible && (
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
        )}

        <div
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
        </div>

        {this.state.rightSideBarVisible && (
          <div id="right_sidebar" className="sidebar">
            {elementSelected ? (
              <div>
                <div>Key: {elementSelected.key}</div>
                <div>X: {elementSelected.left}</div>
                <div>Y: {elementSelected.top}</div>
                <div>Height: {elementSelected.height}</div>
                <div>Width: {elementSelected.width}</div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}
export default EditorScreen;
