import React, { useState } from 'react'
import './NoteSideBar.css';
import NoteContent from '../NoteContainer/NoteContainer';
const NoteSideBar = () => {
    const notes = [
      {
        "noteId": "1",
        "noteName": "Note 1",
        "noteContent": {
          "0": {},
          "1": {},
          "2": {}
        }
      },
      {
        "noteId": "2",
        "noteName": "Note 3",
        "noteContent": {
          "0": {},
          "1": {},
          "2": {}
        }
      },
      {
        "noteId": "3",
        "noteName": "Note 3",
        "noteContent": {
          "0": {},
          "1": {},
          "2": {}
        }
      },
      {
        "noteId": "4",
        "noteName": "Note 4",
        "noteContent": {
          "0": {},
          "1": {},
          "2": {}
        }
      }
    ]
    return (
      <div className="note-sidebar">
        <h1 className='header-sidebar'>Pocket Notes</h1>
        <div>

        </div>
      </div>
    );
};
export default NoteSideBar;