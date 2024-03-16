// Modal.js
import React, { useRef, useState } from "react";
import "./Modal.css";
import { v4 as uuidv4 } from "uuid";
import { useMobileView } from "../../Context/MobileViewContext";

const Modal = ({
  isOpen,
  onClose,
  children,
  colors,
  notes,
  setNoteNoteBar,
}) => {
  const modalRef = useRef(null);
  const [selectedColorRgb, setSelectedColorRgb] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [noteName, setNoteName] = useState("");
  const isMobileView = useMobileView();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setSelectedColorRgb(null);
      onClose();
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const rgb = hexToRgb(color);
    setSelectedColorRgb(rgb);
  };

  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  if (!isOpen) return null;

  const onInputChange = (event) => {
    setNoteName(event.target.value);
  };

  const handleCreate = () => {
    if (!noteName) {
      alert("Please enter a note name.");
    } else if (!selectedColor) {
      alert("Please enter a note color.");
    } else {
      const id = uuidv4();
      const existingIds = new Set(notes.map((note) => note.noteId));
      if (existingIds.has(id)) {
        handleCreate();
        return;
      }
      setNoteNoteBar({
        noteId: id,
        noteName: noteName,
        backgroundColor: selectedColor,
      });
      onClose();
      setSelectedColor(null);
    }
  };

  return (
    <div
      onClick={handleClickOutside}
      style={
        isMobileView
          ? {
              padding: "20px",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }
          : {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }
      }
    >
      <div
        ref={modalRef}
        className="model"
        style={
          isMobileView
            ? {
                background: "white",
                height: "270px",
                width: "600px",
                margin: "auto",
                padding: "2% 2% 2% 15px",
                border: "2px solid rgb(0, 0, 0)",
                borderRadius: "10px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }
            : {
                background: "white",
                height: 270,
                width: 600,
                margin: "auto",
                padding: "2%",
                paddingLeft: "15px",
                border: "2px solid #000",
                borderRadius: "10px",
                boxShadow: "2px solid black",
                position: "relative",
                overflow: "hidden",
              }
        }
      >
        <h3 className="modal-header">Create New group</h3>
        <div className="title">
          <p className="modal-title">Group Name </p>
          <input
            type="text"
            placeholder="Enter group name"
            name="groupName"
            id="title-input"
            onChange={onInputChange}
          />
        </div>
        <div className="title">
          <p className="modal-title">Choose colour </p>
          {colors.map((color) => {
            return (
              <div
                key={color}
                className={`color-box ${
                  color === selectedColor ? "selected-color" : ""
                }`}
                onClick={() => handleColorSelect(color)}
              >
                <div
                  style={{ backgroundColor: color }}
                  className="color-inner"
                ></div>
              </div>
            );
          })}
        </div>
        <button type="button" className="create-btn" onClick={handleCreate}>
          Create
        </button>
      </div>
      {selectedColorRgb && (
        <style>
          {`:root {
            --selected-color-r: ${selectedColorRgb.r};
            --selected-color-g: ${selectedColorRgb.g};
            --selected-color-b: ${selectedColorRgb.b};
          }`}
        </style>
      )}
    </div>
  );
};

export default Modal;
