import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import style from "../style.css";
import blob from "./blob.png";
import SpeechToText from "./SpeexchToText";


export default function Editor({ tempNoteText,setTempNoteText, darkMode }) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });


  return (
    <>
    <section className={darkMode ? "dark" : "pane editor"}>
      {/* <img src={blob} alt="Blob Vector" className="moving-blob" /> */}
      

      <ReactMde
        imgurClientId={blob}
        value={tempNoteText}
        onChange={setTempNoteText}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        heightUnits="vh"
        // className={style.light} // Apply the selected editor class
      />

    </section>
    <SpeechToText/>
    
    </>
  );
}



