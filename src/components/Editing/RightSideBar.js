import React, { Component } from "react";
import "../../css/style.css";
import "../../css/layout.css";

export class RightSideBar extends Component {
  render() {
    let elementSelected = this.props.elementSelected;
    return (
      <div id="right_sidebar" className="sidebar">
        {elementSelected ? (
          <div>
            <div className="field">Key: {elementSelected.key}</div>
            <div className="field">X: {elementSelected.left}</div>
            <div className="field">Y: {elementSelected.top}</div>
            <div className="field">
              Height:
              <input
                type="number"
                min="1"
                value={parseInt(elementSelected.height, 10)}
                onChange={e =>
                  this.props.changeProperty("height", e.target.value + "px")
                }
              />
            </div>

            <div className="field">
              Width:
              <input
                type="number"
                min="1"
                value={parseInt(elementSelected.width, 10)}
                onChange={e =>
                  this.props.changeProperty("width", e.target.value + "px")
                }
              />
            </div>

            <div className="field">
              Background Color:
              <input
                type="color"
                value={
                  elementSelected.backgroundColor
                    ? elementSelected.backgroundColor
                    : null
                }
                onChange={e =>
                  this.props.changeProperty("backgroundColor", e.target.value)
                }
              />
            </div>

            {elementSelected.borderStyle ? (
              <div className="field">
                Border Width:
                <input
                  type="number"
                  min="1"
                  value={parseInt(elementSelected.borderWidth, 10)}
                  onChange={e =>
                    this.props.changeProperty(
                      "borderWidth",
                      e.target.value + "px"
                    )
                  }
                />
              </div>
            ) : null}

            {elementSelected.borderStyle ? (
              <div className="field">
                Border Color:
                <input
                  type="color"
                  value={
                    elementSelected.borderColor
                      ? elementSelected.borderColor
                      : null
                  }
                  onChange={e =>
                    this.props.changeProperty("borderColor", e.target.value)
                  }
                />
              </div>
            ) : null}

            {elementSelected.borderStyle ? (
              <div className="field">
                Border Radius:
                <input
                  type="number"
                  value={parseInt(elementSelected.borderRadius, 10)}
                  min="0"
                  max="50"
                  onChange={e =>
                    this.props.changeProperty(
                      "borderRadius",
                      e.target.value + "%"
                    )
                  }
                />
              </div>
            ) : null}

            <div className="field">
              Text:
              <input
                type="text"
                value={elementSelected.text}
                onChange={e =>
                  this.props.changeProperty("text", e.target.value)
                }
              />
            </div>

            <div style={{ margin: "5px" }}>
              Horizontal Text Alignment
              <div className="properties-grid">
                <div
                  id="left"
                  className="text-align"
                  onClick={e => this.props.changeProperty("textAlign", "left")}
                >
                  L
                </div>
                <div
                  id="center"
                  className="text-align"
                  onClick={e =>
                    this.props.changeProperty("textAlign", "center")
                  }
                >
                  C
                </div>
                <div
                  id="right"
                  className="text-align"
                  onClick={e =>
                    this.props.changeProperty("textAlign", "flex-end")
                  }
                >
                  R
                </div>
                <div
                  id="justify"
                  className="text-align"
                  onClick={e =>
                    this.props.changeProperty("textAlign", "justify")
                  }
                >
                  J
                </div>
              </div>
            </div>

            <div style={{ margin: "5px" }}>
              Vertical Text Alignment
              <div className="properties-grid">
                <div
                  id="left"
                  className="text-align"
                  onClick={e =>
                    this.props.changeProperty("alignItems", "baseline")
                  }
                >
                  T
                </div>
                <div
                  id="center"
                  className="text-align"
                  onClick={e =>
                    this.props.changeProperty("alignItems", "center")
                  }
                >
                  C
                </div>
                <div
                  id="right"
                  className="text-align"
                  onClick={e =>
                    this.props.changeProperty("alignItems", "flex-end")
                  }
                >
                  B
                </div>
              </div>
            </div>

            <div style={{ margin: "5px" }}>
              Font Style
              <div className="properties-grid">
                <div
                  id="bold"
                  className="font-style"
                  onClick={e =>
                    this.props.changeProperty(
                      "fontWeight",
                      elementSelected.fontWeight ? null : "bold"
                    )
                  }
                >
                  B
                </div>
                <div
                  id="italic"
                  className="font-style"
                  onClick={e =>
                    this.props.changeProperty(
                      "fontStyle",
                      elementSelected.fontStyle ? null : "italic"
                    )
                  }
                >
                  I
                </div>
                <div
                  id="underline"
                  className="font-style"
                  onClick={e => {
                    if (
                      elementSelected.textDecoration &&
                      elementSelected.textDecoration.includes("line-through")
                    ) {
                      this.props.changeProperty(
                        "textDecoration",
                        elementSelected.textDecoration.includes("underline")
                          ? "line-through"
                          : "line-through underline"
                      );
                    } else {
                      this.props.changeProperty(
                        "textDecoration",
                        elementSelected.textDecoration ? null : "underline"
                      );
                    }
                  }}
                >
                  U
                </div>
                <div
                  id="s"
                  className="font-style"
                  onClick={e => {
                    if (
                      elementSelected.textDecoration &&
                      elementSelected.textDecoration.includes("underline")
                    ) {
                      this.props.changeProperty(
                        "textDecoration",
                        elementSelected.textDecoration.includes("line-through")
                          ? "underline"
                          : "line-through underline"
                      );
                    } else {
                      this.props.changeProperty(
                        "textDecoration",
                        elementSelected.textDecoration ? null : "line-through"
                      );
                    }
                  }}
                >
                  S
                </div>
              </div>
            </div>

            <div className="field">
              Font Size:
              <input
                type="number"
                min="1"
                value={parseInt(elementSelected.fontSize, 10)}
                onChange={e =>
                  this.props.changeProperty("fontSize", e.target.value + "pt")
                }
              />
            </div>

            <div className="field">
              Font Color:
              <input
                type="color"
                value={elementSelected.color}
                onChange={e =>
                  this.props.changeProperty("color", e.target.value)
                }
              />
            </div>
            <button onClick={this.props.deleteElement}>Delete element</button>
            <button
              onClick={() => this.props.moveElement(elementSelected.key + 1)}
            >
              Move up
            </button>
            <button
              onClick={() => this.props.moveElement(elementSelected.key - 1)}
            >
              Move down
            </button>
            <button onClick={() => this.props.moveElement("front")}>
              Move to front
            </button>
            <button onClick={() => this.props.moveElement("back")}>
              Move to back
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
export default RightSideBar;
