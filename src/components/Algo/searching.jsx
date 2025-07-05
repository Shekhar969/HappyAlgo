import React, { useState } from "react";

function Searching({ setSelected, isOnlyCard }) {
  const handleClick = () => {
    if (!isOnlyCard) setSelected("searching");
  };

  const [selectedAlgo, setSelectedAlgo] = useState("Linear Search");

  const changeAlgo = (algo) => {
    setSelectedAlgo(algo);
  };

  return (
    <div
      className={`mainContainerSearching ${isOnlyCard ? "expandedCard" : ""}`}
      onClick={handleClick}
    >
      <h2><strong>Searching</strong></h2>

      {isOnlyCard && (
        <>
          <div className="searchingHeader">
            <div className="searchingAlgos" onClick={() => changeAlgo("Linear Search")}>Linear Search</div>
            <div className="searchingAlgos" onClick={() => changeAlgo("Binary Search")}>Binary Search</div>
            <div className="searchingAlgos" onClick={() => changeAlgo("Jump Search")}>Jump Search</div>
          </div>

          <div className="searchingDescription" style={{ marginTop: "1rem" }}>
            <strong>Selected Algorithm:</strong> {selectedAlgo}
          </div>
        </>
      )}
      
     {!isOnlyCard && (
      <div className="searchingDescription">
        Searching is the process of finding the location of a specific element
        within a data structure (like an array, list, or tree). It’s a
        fundamental operation in computer science used in algorithms, databases,
        and real-time applications.
      </div>
  )}
      {isOnlyCard && (
        <button onClick={() => setSelected("")} style={{ marginTop: "1rem" }}>
          ⬅ Back to All
        </button>
      )}
    </div>
  );
}

export default Searching;
