import React, { useEffect, useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "../style.css";
import blob from "./blob.png";
// import SpeechToText from "./speechToText";
import useSpeechToText from "react-hook-speech-to-text";

export default function Editor({ tempNoteText, setTempNoteText, darkMode,currentNote }) {
  const [selectedTab, setSelectedTab] = React.useState("write");
  const [speechResults, setSpeechResults] = useState({
    interimResult: "",
    results: [],
  });

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  const updateSpeechResults = (interimResult, results) => {
    setSpeechResults({ interimResult, results });
  };

  // Combine speech-to-text results into a single string
  const combinedResults = [
    ...speechResults.results.map((result) => result.transcript),
    speechResults.interimResult,
  ].join(" ");

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  useEffect(() => {
    if (isRecording && results && results.length > 0) {
      const transcripts = results.map((result) => result.transcript).join(" ");
      if (transcripts) {
        setTempNoteText((prevNoteText) => prevNoteText + transcripts + " ");
        setResults([]);
      }
    }
  }, [isRecording, results]);

  return (
    <>
      <section className={darkMode ? "dark" : "pane editor"}>
        <img src={blob} alt="Blob Vector" className="moving-blob" />

        <ReactMde
          imgurClientId={blob}
          value={currentNote?.body}
          onChange={setTempNoteText}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          
        />
       
        <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
         
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </section>
    </>
  );
}
