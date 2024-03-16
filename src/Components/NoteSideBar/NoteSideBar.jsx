import React, { useState, useEffect } from "react";
import "./NoteSideBar.css";
import Modal from "../Modal/Modal";

const NoteSideBar = ({ sendNotes , isClicked }) => {
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [open, setOpen] = useState(false);

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const setNoteNoteBar = (val) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        noteId: val.noteId,
        noteName: val.noteName,
        backgroundColor: val.backgroundColor,
        noteContent: [],
      },
    ]);
  };

  const handleClick = (note) => {
    return () => {
      let noteId = note.noteId;
      let filteredNotes = notes.filter((f) => f.noteId === noteId);
      sendNotes(filteredNotes);
      isClicked(true)
      setNotes(
        notes.map((n) =>
          n.noteId === note.noteId
            ? { ...n, isSelected: !n.isSelected }
            : { ...n, isSelected: false }
        )
      );
    };
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="note-sidebar">
      <h1 className="header-sidebar">Pocket Notes</h1>
      <div className="main-container">
        {notes.map((note) => (
          <div
            className="container"
            style={{
              backgroundColor: note.isSelected ? "rgba(47, 47, 47, 0.17)" : "",
            }}
            key={note.noteId}
            onClick={handleClick(note)}
          >
            <div
              className="note-name-img"
              style={{ backgroundColor: note.backgroundColor }}
            >
              <p className="initial-name-text">
                {note.noteName
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </p>
            </div>
            <div className="note-name-sidebar">{note.noteName}</div>
          </div>
        ))}
      </div>
      <button className="btn" onClick={handleOpen}>
        <span className="plus-icon">+</span>
      </button>
      <Modal
        isOpen={open}
        onClose={handleClose}
        colors={colors}
        notes={notes}
        setNoteNoteBar={setNoteNoteBar}
      ></Modal>
    </div>
  );
};
export default NoteSideBar;
