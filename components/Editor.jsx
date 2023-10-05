import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import style from "../style.css";
import blob from "./blob.png";
// import circle from "./circle.png";
// import cube from "./cube.png";
// import dots from "./dots.png";
// import plus from "./plus.png";
// import pb from "./pb.png";
// import zigzags from "./zigzags.png";



export default function Editor({ currentNote, updateNote, darkMode, toggleDarkMode }) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  // Define CSS classes for dark and light mode
//   const editorClassName = darkMode ? "dark" : "";




  return (
    <section className={darkMode ? "dark" : "pane editor"}>
      <img src={blob} alt="Blob Vector" className="moving-blob" />
      {/* another file */}
      <div style={{display: darkMode ? "block" : "none"}} className="hero-section-right" >
        <div className="absolute icons icon-dots">
          <img src={blob} alt="" />
        </div>
        <div className="absolute icons icon-cube">
          <img src={blob} alt="" />
        </div>
        <div className="absolute icons icon-circle">
          <img src={blob} alt="" />
        </div>
        <div className="absolute icons icon-zigzag">
          <img src={blob} alt="" />
        </div>

        <div className="absolute icons icon-plus">
          <img src={blob} alt="" />
        </div>

        {/* <div className="user-image">
          <img src={blob} alt="" />
        </div> */}
      </div>

      <ReactMde
      imgurClientId={blob}
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        heightUnits="vh"
        className={style.light} // Apply the selected editor class
      />
      
    </section>
  );
}

