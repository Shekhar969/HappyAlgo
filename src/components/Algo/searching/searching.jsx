import React, { useState } from "react";
import LinearSearch from "./linearSearch";


function Searching({ setSelected, isOnlyCard }) {
  const handleClick = () => {
    if (!isOnlyCard) setSelected("searching");
  };

  const [SelectedAlgoComponent, setSelectedAlgoComponent] = useState(() => LinearSearch);

  const changeAlgo = (AlgoComponent) => {
    setSelectedAlgoComponent(() => AlgoComponent);
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
            <div className="searchingAlgos" onClick={() => changeAlgo(LinearSearch)}>Linear Search</div>
            <div className="searchingAlgos" onClick={() => changeAlgo(BinarySearch)}>Binary Search</div>
            <div className="searchingAlgos" onClick={() => changeAlgo(JumpSearch)}>Jump Search</div>
          </div>

          <div className="searchingDescription" style={{ marginTop: "1rem" }}>
            <div style={{ marginTop: "0.5rem" }}>
              {SelectedAlgoComponent ? <SelectedAlgoComponent /> : <p>Please select an algorithm.</p>}
            </div>
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
