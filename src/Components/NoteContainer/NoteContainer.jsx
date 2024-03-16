import React, { useState } from "react";
import "./NoteContainer.css";
import bgImg from "../../assets/image-bg.png";
import NoteContent from "./NoteContent/NoteContent";
import { MdLock } from "react-icons/md";
import { useMobileView } from '../../Context/MobileViewContext';

function NoteContainer({ notes , isNotesSelected , setNotesContainer , isClicked}) {

  const isMobileView = useMobileView();

  return (
    <div className="div-container">
      {isMobileView ? 
        <NoteContent notes={notes} isClicked={isClicked} setNotesContainer={setNotesContainer}></NoteContent>
      : isNotesSelected ? (
        <NoteContent notes={notes} isClicked={isClicked} setNotesContainer={setNotesContainer}></NoteContent>
      ) : (
        <div style={{display: "flex" ,height : "100%" , margin : "auto" , position : "relative"}}>
          <div className="emptynotes-conatiner">
            <img src={bgImg} alt="bg-img" />
            <h1>Pocket Notes</h1>
            <p className="text">
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
          </div>
          <div style={{display: "flex" , width : "100%" , justifyContent : "center" , alignItems : "center" ,position:"absolute",bottom : "0", textAlign : "center"}}>
            <MdLock />
            <p>end-to-end encrypted</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteContainer;
