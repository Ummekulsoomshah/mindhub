import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = React.useState(notes[0]?.id || "");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const deleteNote = (noteId) => {
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  };

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            darkMode={darkMode}
            notes={notes}
            setCurrentNoteId={setCurrentNoteId}
            currentNoteId={currentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
            toggleDarkMode={toggleDarkMode}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor
              darkMode={darkMode}
              currentNoteId={currentNoteId}
              notes={notes}
              setNotes={setNotes}
            />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
