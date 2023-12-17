import React, { useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import style from "../style.css";
import blob from "./blob.png";
import SpeechToText from "./speechToText";



export default function Editor({ tempNoteText,setTempNoteText, darkMode }) {
  const [selectedTab, setSelectedTab] = React.useState("write");
  const [speechResults, setSpeechResults] = useState({ interimResult: '', results: [] });

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  const updateSpeechResults = (interimResult, results ) => {
    setSpeechResults({ interimResult, results });
  };

  // Combine speech-to-text results into a single string
  const combinedResults = [...speechResults.results.map((result) => result.transcript), speechResults.interimResult].join(' ');

  // Update tempNoteText with combined results
  const updateTempNoteTextWithSpeech = () => {
    setTempNoteText(combinedResults);
  };
  return (
    <>
    <section className={darkMode ? "dark" : "pane editor"}>
    <SpeechToText updateSpeechResults={updateSpeechResults} />
      <img src={blob} alt="Blob Vector" className="moving-blob" />
      

      <ReactMde
        imgurClientId={blob}
        value={tempNoteText}
        onChange={setTempNoteText}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        // minEditorHeight={80}
        // heightUnits="vh"
        // className={style.light} // Apply the selected editor class
      />

    </section>
    
    
    </>
  );
}

