import React, { Component } from "react";
import "../../css/style.css";
import "../../css/layout.css";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import { Rnd } from "react-rnd";

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
    this.shiftX = 0;
    this.shiftY = 0;
  }

  mouseDownHandler = (event, element) => {
    // event.stopPropagation();
    this.setState({ elementSelected: element });
  };

  dragStartHandler = (event, style) => {
    this.shiftX = event.pageX - event.target.getBoundingClientRect().left;
    this.shiftY = event.pageY - event.target.getBoundingClientRect().top;
    if (style) {
      // console.log("style", style)
      event.dataTransfer.setData("element", JSON.stringify(style));
    }
    return false;
  };

  onDropHandler = event => {
    event.preventDefault();
    let elements = this.state.elements;

    // Get the adjusted x and y coordinates
    event.dataTransfer.dropEffect = "copy";
    let bounds = event.target.getBoundingClientRect();
    let x = event.clientX - bounds.left - this.shiftX;
    let y = event.clientY - bounds.top - this.shiftY;

    // Get the data sent of the element to add
    var data = JSON.parse(event.dataTransfer.getData("element"));

    // Create the new element with the data
    let newElement = {
      key: elements.length, // Need better method to ensure unique key (think when something gets deleted)
      left: parseInt(x, 10),
      top: parseInt(y, 10),
      ...data
    };

    // Update the state
    elements.push(newElement);

    // ----------------test---------------------
    // elements.push(<TextBox style={{left: parseInt(x), top: parseInt(y), ...data}} />)
    // -----------------------------------------

    this.setState(state => ({
      ...state,
      elementSelected: newElement,
      elements: elements
    }));
  };

  onDragoverHandler = e => {
    e.preventDefault();
  };

  duplicateElement = () => {
    if (this.state.elementSelected) {
      console.log("Duplicating:", this.state.elementSelected);
      let elements = this.state.elements;
      let element = JSON.parse(JSON.stringify(this.state.elementSelected));
      console.log(element)
      element.key = elements.length;
      element.top = element.top + 15;
      element.left = element.left + 15; 
      elements.push(element)
      this.setState({ elements: elements, elementSelected: element });
    }
  }

  deleteElement = () => {
    if (this.state.elementSelected) {
      console.log("Deleting:", this.state.elementSelected);
      let index = this.state.elementSelected.key;
      let elements = this.state.elements;
      elements.splice(index, 1);
      for (let i = index; i < elements.length; i++) {
        elements[i].key = i;
      }
      this.setState({ elements: elements, elementSelected: false });
    }
  };

  moveElement = newIndex => {
    console.log("move element");
    if (this.state.elementSelected) {
      let oldIndex = this.state.elementSelected.key;
      let elements = this.state.elements;
      if (newIndex === "back" && oldIndex !== 0) {
        // Move element to back (beginning)
        elements.unshift(elements.splice(oldIndex, 1)[0]);
        for (let i = 0; i <= oldIndex; i++) {
          elements[i].key = i;
        }
      } else if (newIndex === "front" && newIndex !== elements.length - 1) {
        // Move element to top (end)
        elements.push(elements.splice(oldIndex, 1)[0]);
        for (let i = oldIndex; i < elements.length; i++) {
          elements[i].key = i;
        }
      } else if (newIndex >= 0 && newIndex < this.state.elements.length) {
        // Swap elements
        [elements[oldIndex], elements[newIndex]] = [
          elements[newIndex],
          elements[oldIndex]
        ];
        elements[oldIndex].key = oldIndex;
        elements[newIndex].key = newIndex;
      } // Don't update state if invalid index
      else return;
      this.setState({ elements: elements });
    }
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

  onRndDragStart = e => {
    e.stopPropagation();
  };

  onRndDragStop = (e, data) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("done dragging");
    let elements = this.state.elements;
    elements[this.state.elementSelected.key].top = parseInt(data.y, 10);
    elements[this.state.elementSelected.key].left = parseInt(data.x, 10);
    this.setState({
      elements: elements
    });
  };

  onResizeStop = (e, dir, refToElement, delta, position) => {
    console.log("done resizing");
    let elements = this.state.elements;
    let pos = this.state.elementSelected.key;
    elements[pos].top = parseInt(position.y, 10);
    elements[pos].left = parseInt(position.x, 10);
    elements[pos].width = parseInt(elements[pos].width, 10) + delta.width;
    elements[pos].height = parseInt(elements[pos].height, 10) + delta.height;
    this.setState({
      elements: elements
    });
  };

  unselect = () => { this.setState({ elementSelected: false }) }

  render() {
    let elements = this.state.elements;
    console.log("elements:", elements);
    let elementSelected = this.state.elementSelected;
    let workspaceWidthPercent = 70.0;
    if (!this.state.leftSideBarVisible) workspaceWidthPercent += 15.0;
    if (!this.state.rightSideBarVisible) workspaceWidthPercent += 15.0;

    return (
      <div className="workspace_wrapper">
        {this.state.leftSideBarVisible && (
          <LeftSideBar
          unselect={this.unselect}
          dragStartHandler={this.dragStartHandler}
          />
        )}
        <div
          className="edit_workspace"
          style={{ width: workspaceWidthPercent + "%" }}
          onDragOver={this.onDragoverHandler}
          onDrop={this.onDropHandler}
          onMouseDown={() => this.setState({ elementSelected: false })}
        >
          {elements &&
            elements.map((ele, index) => (
              <Rnd
                key={index}
                bounds="parent"
                resizeHandleClasses={
                  ele === elementSelected
                    ? {
                        bottomLeft: "resizer bottom-left",
                        bottomRight: "resizer bottom-right",
                        topLeft: "resizer top-left",
                        topRight: "resizer top-right"
                      }
                    : null
                }
                size={{
                  width: ele.width,
                  height: ele.height
                }}
                position={{
                  x: ele.left,
                  y: ele.top
                }}
                enableResizing={
                  ele === elementSelected
                    ? {
                        top: false,
                        right: false,
                        bottom: false,
                        left: false,
                        topRight: true,
                        bottomRight: true,
                        bottomLeft: true,
                        topLeft: true
                      }
                    : null
                }
                onDragStop={this.onRndDragStop}
                onDragStart={this.onRndDragStart}
                onResizeStart={this.onResizeStart}
                onResizeStop={this.onResizeStop}
              >
                {ele === elementSelected ? (
                  <div
                    key={index}
                    onMouseDown={e => this.mouseDownHandler(e, ele)}
                    className="grabbable"
                    style={{
                      ...ele,
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%"
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        left: -parseInt(ele.borderWidth, 10) + "px",
                        top: -parseInt(ele.borderWidth, 10) + "px",
                        width:
                          "calc(100% + " +
                          2 * parseInt(ele.borderWidth, 10) +
                          "px)",
                        height:
                          "calc(100% + " +
                          2 * parseInt(ele.borderWidth, 10) +
                          "px)",
                        border: "solid #4286f4 2px",
                        boxSizing: "border-box",
                        display: "flex",
                        justifyContent: ele.textAlign,
                        alignItems: ele.alignItems
                      }}
                    >
                      <div>{ele.text}</div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    onMouseDown={e => this.mouseDownHandler(e, ele)}
                    className="grabbable"
                    style={{ ...ele, top: 0, left: 0 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: ele.textAlign,
                        alignItems: ele.alignItems,
                        height: "100%"
                      }}
                    >
                      <div>{ele.text}</div>
                    </div>
                  </div>
                )}
              </Rnd>
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
          <RightSideBar
            elementSelected={elementSelected}
            changeProperty={this.changeProperty}
            deleteElement={this.deleteElement}
            moveElement={this.moveElement}
            duplicateElement={this.duplicateElement}
          />
        )}
      </div>
    );
  }
}
export default EditorScreen;
