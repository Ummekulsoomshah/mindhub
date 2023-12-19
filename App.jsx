import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { onSnapshot ,addDoc,doc,deleteDoc} from "firebase/firestore";
import { notesCollection ,db} from "./firebase"

export default function App() {
  const [notes, setNotes] = React.useState([]);
  const [currentNoteId, setCurrentNoteId] = React.useState("")

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

    React.useEffect(() => {
      const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
          // Sync up our local notes array with the snapshot data
          const notesArr = snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
          }))
          setNotes(notesArr)
      })
      return unsubscribe
  }, [])

  async function createNewNote() {
    const newNote = {
        body: "# Type your markdown note's title here",
        voice: "",
    }
    const newNoteRef = await addDoc(notesCollection, newNote)
    setCurrentNoteId(newNoteRef.id)
}

  // toggle func
  React.useEffect(() => {
    if (!currentNoteId) {
        setCurrentNoteId(notes[0]?.id)
    }
}, [notes])
  const [darkMode, setDarkMode] = React.useState(false);
  const [tempNoteText, setTempNoteText] = useState("");
  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  async function updateNote(text) {
    try {
      const docRef = doc(db, "notes", currentNoteId);
      await setDoc(docRef, { body: text}, {voice: tempNoteText }, { merge: true });
      console.log("Note updated successfully!");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }
  
  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId)
    await deleteDoc(docRef)
}
  // new interface
//   console.log(currentNote);
//   console.log(notes);
  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            darkMode={darkMode}
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
            toggleDarkMode={toggleDarkMode}
          />
            <Editor
              // toggle
              darkMode={darkMode}
              currentNote={currentNote}
              updateNote={updateNote}
              tempNoteText={tempNoteText}
              setTempNoteText={setTempNoteText}
            />
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
