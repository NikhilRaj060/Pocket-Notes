import React, { useState } from "react";
import "./NoteContent.css";
import { IoSendSharp } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { IoMdArrowBack } from "react-icons/io";
import { useMobileView } from '../../../Context/MobileViewContext';

function NoteContent({ notes, setNotesContainer , isClicked}) {
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [noteText, setNoteText] = useState("");
  const isMobileView = useMobileView();

  function handleInputChange(event) {
    const inputValue = event.target.value;
    if (inputValue !== "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    setNoteText(inputValue);
  }

  const handleButtonClick = (note) => {
    return () => {
      const timestamp = Date.now();
      const dateObj = new Date(timestamp);
  
      // Get month name
      const months = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"];
      const month = dateObj.getMonth();
      const monthName = months[month];
  
      // Format date
      const day = ("0" + dateObj.getDate()).slice(-2);
      const year = dateObj.getFullYear();
      const date = `${day} ${monthName} ${year}`;
  
      // Format time
      let hours = dateObj.getHours();
      let minutes = dateObj.getMinutes();
      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      const time = `${hours}:${minutes}${" "}${hours > 12  ? "PM" : "AM"}`;

      // Update note content and reset textarea
      setNotesContainer({
        noteId: note.noteId,
        noteText: noteText,
        creationDate: date,
        creationTime: time,
      });
  
      // Reset textarea and disable button
      setNoteText("");
      setButtonDisabled(true);
    };
  };

  let iconSize = isMobileView ? 20 : 32;

  const handleBack = () => {
    isClicked(false)
  }
  

  return (
    <>
      {notes?.map((note) => (
        <>
          <header className="nav" key={note.noteId}>
            <div className="nav-container">
              {isMobileView ? <IoMdArrowBack className="back-icon" onClick={handleBack} color="white" size={44} scale={2}/> : " "}
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
              <div className="note-name">{note.noteName}</div>
            </div>
          </header>
          <div className="main-body">
            {note.noteContent.length ? (
              note.noteContent.map((noteConent) => (
                <div className="note-content">
                  <div className="text-content">
                    <div className="note-text">{noteConent.noteText}</div>
                    <div className="dateandtime">
                      <div className="dateandtimewithicon">
                        {noteConent.creationDate}{" "}
                        <span className="doticon">
                          <LuDot size={30} />
                        </span>{" "}
                        {noteConent.creationTime}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-notes">No notes yet. Please add notes!!!</p>
            )}
          </div>
          <div className="textarea" id={note.noteId}>
            <textarea
              type="text"
              value={noteText}
              onChange={handleInputChange}
              placeholder="Enter your text here..."
            />
            <button
              onClick={handleButtonClick(note)}
              disabled={isButtonDisabled}
              className="send-icon"
              style={
                isButtonDisabled ? { color: "#ABABAB" } : { color: "#001F8B" }
              }
            >
              <IoSendSharp size={iconSize} />
            </button>
          </div>
        </>
      ))}
    </>
  );
}

export default NoteContent;
