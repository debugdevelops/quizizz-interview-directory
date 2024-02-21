import { useEffect } from "react";
import { dirStructure } from "./resources/folderStructure";
import File from "./components/File";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [searchQuery, setSearchQuery] = useLocalStorage("query", "");
  const [fileMap, setFileMap] = useLocalStorage("fileMap", null);

  useEffect(() => {
    if (!fileMap) return;
    const newFileMap = { ...fileMap };
    function fileFinder(dirStructure) {
      let setOpen = false;
      const isHighlighted =
        searchQuery &&
        dirStructure.name
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase());
      if (isHighlighted) {
        setOpen = true;
      }
      if (dirStructure.isDir) {
        for (let item of dirStructure.items) {
          const shouldSetOpen = fileFinder(item);
          setOpen = setOpen || shouldSetOpen;
        }
      }
      newFileMap[dirStructure.name] = {
        ...newFileMap[dirStructure.name],
        open: newFileMap[dirStructure.name].open || setOpen,
        isHighlighted: isHighlighted,
      };
      return setOpen;
    }
    fileFinder(dirStructure);
    setFileMap(newFileMap);
  }, [searchQuery]);

  useEffect(() => {
    if (fileMap) return;
    const fileStructMap = {};
    function fileFinder(dirStructure) {
      fileStructMap[dirStructure.name] = {
        isDir: dirStructure.isDir,
        open: false,
        isHighlighted: false,
      };
      if (dirStructure.isDir) {
        for (let item of dirStructure.items) {
          fileFinder(item);
        }
      }
    }
    fileFinder(dirStructure);
    setFileMap(fileStructMap);
  }, [dirStructure]);

  const toggleOpened = (name) => {
    setFileMap((fileMap) => {
      const newFileMap = { ...fileMap };
      newFileMap[name] = {
        ...fileMap[name],
        open: !fileMap[name].open,
      };
      return newFileMap;
    });
  };

  return (
    fileMap && (
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <File
          dirStructure={dirStructure}
          toggleOpened={toggleOpened}
          name={dirStructure.name}
          fileMap={fileMap}
        />
      </div>
    )
  );
}

export default App;
