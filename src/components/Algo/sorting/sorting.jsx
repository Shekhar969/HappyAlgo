import React from "react";

function Sorting({ setSelected, isOnlyCard }) {
  const handleClick = () => {
    if (!isOnlyCard) setSelected("sorting");
  };

  return (
    <div
      className="mainContainerSorting"
      onClick={handleClick}
    >
      <h3><strong>Sorting</strong></h3>
      <div className="sortingHeader">
        <div className="sortingAlgos">Bubble Sort</div>
        <div className="sortingAlgos">Selection Sort</div>
        <div className="sortingAlgos">Merge Sort</div>
        <div className="sortingAlgos">Quick Sort</div>
      </div>
      <div className="sortingDescription">
        Sorting is the process of arranging elements in a specific order, typically ascending or descending. It helps in efficient searching and data organization. Common sorting algorithms vary in complexity and performance.
      </div>

      {isOnlyCard && (
        <button onClick={() => setSelected("")} style={{ marginTop: "1rem" }}>
          ⬅ Back to All
        </button>
      )}
    </div>
  );
}

export default Sorting;
