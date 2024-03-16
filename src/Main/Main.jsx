import React, { useState, useEffect } from "react";
import NoteSideBar from "../Components/NoteSideBar/NoteSideBar";
import NoteContainer from "../Components/NoteContainer/NoteContainer";
import "./Main.css";
import { useMobileView } from '../Context/MobileViewContext';

function Main() {
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [isNotesSelected, setIsNotesSelected] = useState(false);
  const [isDivClicked, setIsDivClicked] = useState(false);
  const isMobileView = useMobileView();

  const handleNotes = (data) => {
    setNotes(data);
    if (!isMobileView) {
      setIsNotesSelected((prev) => !prev);
    }
  };

  const setNotesContainer = (val) => {
    setNotes((prevNotes) => {
      const index = prevNotes.findIndex((note) => note.noteId === val.noteId);

      if (index !== -1) {
        const updatedNotes = [...prevNotes];

        updatedNotes[index].noteContent.push({
          noteText: val.noteText,
          creationDate: val.creationDate,
          creationTime: val.creationTime,
        });

        return updatedNotes;
      }
      return prevNotes;
    });
    const storedNotes = localStorage.getItem("notes");
    let updatedNotes = storedNotes ? JSON.parse(storedNotes) : [];

    // Find the index of the note to update
    const index = updatedNotes.findIndex((note) => note.noteId === val.noteId);

    if (index !== -1) {
      // Update the content of the specific note
      updatedNotes[index].noteContent.push({
        noteText: val.noteText,
        creationDate: val.creationDate,
        creationTime: val.creationTime,
      });

      // Save the updated note back to localStorage
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  const isClicked = (val) => {
    setIsDivClicked(val);
  };

  return (
    <div className="main">
      {isMobileView ? (
        isDivClicked ? (
          <NoteContainer
            notes={notes}
            setNotesContainer={setNotesContainer}
            isNotesSelected={isNotesSelected}
            isClicked={isClicked}
          />
        ) : (
          <NoteSideBar
            isClicked={isClicked}
            setNotes={setNotesContainer}
            isNotesSelected={isNotesSelected}
            sendNotes={handleNotes}
          />
        )
      ) : (
        <>
          <NoteSideBar
            isClicked={isClicked}
            setNotes={setNotesContainer}
            isNotesSelected={isNotesSelected}
            sendNotes={handleNotes}
          />
          <NoteContainer
            notes={notes}
            setNotesContainer={setNotesContainer}
            isNotesSelected={isNotesSelected}
          />
        </>
      )}
    </div>
  );
}

export default Main;
