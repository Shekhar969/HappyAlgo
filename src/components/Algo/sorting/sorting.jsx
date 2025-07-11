import React, { useState } from "react";
import BubbleSort from "./bubbleSort";
import SelectionSort from "./selectionSort";
import MergeSort from "./mergeSort";
import QuickSort from "./quickSort";

function Sorting({ setSelected, isOnlyCard }) {
  const handleClick = () => {
    if (!isOnlyCard) setSelected("sorting");
  };

  const [SelectedSortComponent, setSelectedSortComponent] = useState(() => BubbleSort);

  const changeSortAlgo = (AlgoComponent) => {
    setSelectedSortComponent(() => AlgoComponent);
  };

  return (
    <div
      className={`mainContainerSorting ${isOnlyCard ? "expandedCard" : ""}`}
      onClick={handleClick}
    >
      {isOnlyCard && (
        <button onClick={() => setSelected("")} style={{ marginTop: "1rem" }}>
          ⬅ Back to All
        </button>
      )}
      <h2><strong>Sorting</strong></h2>

      {isOnlyCard && (
        <>
          <div className="sortingHeader">
            <div className="sortingAlgos" onClick={() => changeSortAlgo(BubbleSort)}>Bubble Sort</div>
            <div className="sortingAlgos" onClick={() => changeSortAlgo(SelectionSort)}>Selection Sort</div>
            <div className="sortingAlgos" onClick={() => changeSortAlgo(MergeSort)}>Merge Sort</div>
            <div className="sortingAlgos" onClick={() => changeSortAlgo(QuickSort)}>Quick Sort</div>
          </div>

          <div className="sortingDescription" style={{ marginTop: "1rem" }}>
            <div style={{ marginTop: "0.5rem" }}>
              {SelectedSortComponent ? <SelectedSortComponent /> : <p>Please select an algorithm.</p>}
            </div>
          </div>
        </>
      )}

      {!isOnlyCard && (
        <div className="sortingDescription">
          Sorting is the process of arranging elements in a specific order, typically ascending or descending.
          It helps in efficient searching and data organization. Common sorting algorithms vary in complexity and performance.
        </div>
      )}
    </div>
  );
}

export default Sorting;
