import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import style from "../style.css";
import blob from "./blob.png";


export default function Editor({ tempNoteText,setTempNoteText, darkMode }) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });


  return (
    <section className={darkMode ? "dark" : "pane editor"}>
      

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
      />

    </section>
  );
}



