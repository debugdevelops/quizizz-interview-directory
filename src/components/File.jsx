import React from "react";
import "./styles.css";

function File({ dirStructure, toggleOpened, name, fileMap }) {
  return (
    <div>
      <div className="file">
        <button
          onClick={() => {
            toggleOpened(dirStructure.name);
          }}
          className={`file-name ${
            fileMap[dirStructure.name].isHighlighted && "is-highlighted"
          }`}
        >
          {dirStructure.isDir && (fileMap[dirStructure.name].open ? "V" : ">")}{" "}
          {dirStructure.name}
        </button>
        {dirStructure.isDir &&
          fileMap[dirStructure.name].open &&
          dirStructure.items.map((file) => (
            <File
              dirStructure={file}
              toggleOpened={toggleOpened}
              name={`${name}_${file.name}`}
              key={`${name}_${file.name}`}
              fileMap={fileMap}
            />
          ))}
      </div>
    </div>
  );
}

export default File;
