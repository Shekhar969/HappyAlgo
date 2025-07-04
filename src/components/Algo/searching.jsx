import React from "react";

function Searching({ setSelected, isOnlyCard }) {
  const handleClick = () => {
    if (!isOnlyCard) setSelected("searching");
  };

  return (
    <div
      className={`mainContainerSearching ${isOnlyCard ? "expandedCard" : ""}`}
      onClick={handleClick}
    >
      <h3><strong>Searching</strong></h3>

      {isOnlyCard && (
        <div className="searchingHeader">
          <div className="searchingAlgos">Linear Search</div>
          <div className="searchingAlgos">Binary Search</div>
          <div className="searchingAlgos">Jump Search</div>
        </div>
      )}

      <div className="searchingDescription">
        Searching is the process of finding the location of a specific element
        within a data structure (like an array, list, or tree). It’s a
        fundamental operation in computer science used in algorithms, databases,
        and real-time applications.
      </div>

      {isOnlyCard && (
        <button onClick={() => setSelected("")} style={{ marginTop: "1rem" }}>
          ⬅ Back to All
        </button>
      )}
    </div>
  );
}

export default Searching;
