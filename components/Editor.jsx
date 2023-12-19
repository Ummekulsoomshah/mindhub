import React, { useEffect, useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "../style.css";
import blob from "./blob.png";
// import SpeechToText from "./speechToText";
import useSpeechToText from "react-hook-speech-to-text";

export default function Editor({ notes, setNotes, darkMode, currentNoteId }) {
  const [selectedTab, setSelectedTab] = React.useState("write");
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  const {
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  const onChangeValue = (value) => {
    const existingNoteIndex = notes.findIndex(
      (note) => note.id === currentNoteId
    );
    if (value === "") {
    }
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];
      updatedNotes[existingNoteIndex] = {
        ...updatedNotes[existingNoteIndex],
        body:
          value || value === ""
            ? value
            : updatedNotes[existingNoteIndex].body +
              " " +
              results.map((result) => result.transcript).join(" ") +
              " ",
      };
      return updatedNotes;
    });
  };
  useEffect(() => {
    if (isRecording && results && results.length > 0) {
      onChangeValue();
      setResults([]);
    }
  }, [isRecording, results]);

  return (
    <>
      <section className={darkMode ? "dark" : "pane editor"}>
        <img src={blob} alt="Blob Vector" className="moving-blob" />

        <ReactMde
          imgurClientId={blob}
          value={notes.find((note) => note.id === currentNoteId)?.body || ""}
          onChange={onChangeValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />

        <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
          {isRecording ? "Stop" : "Start"}
        </button>
      </section>
    </>
  );
}
