import React, { useState, useEffect } from "react";
import { generateRandomArray } from "../../utils/randomArrayGen";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function BubbleSort() {
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState([]);
  const [logs, setLogs] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    setArray(generateRandomArray(arraySize));
  }, [arraySize]);

  const reset = () => {
    setArray(generateRandomArray(arraySize));
    setLogs([]);
    setIsSorting(false);
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setLogs([j, j + 1]);
        await sleep(100);

        if (arr[j] > arr[j + 1]) {
          // swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
      }
    }
    setLogs([]);
    setIsSorting(false);
  };

  return (
    <div className="mainContainer">
      <div className="array">
        {array.map((num, idx) => (
          <div
            key={idx}
            className={`block ${logs.includes(idx) ? "highlighted" : ""}`}
            style={{ height: `${num * 3}px` }}
          >
            {num}
          </div>
        ))}
      </div>

      <div className="controls">
        <label>Array Size: {arraySize}</label>
        <input
          type="range"
          min="5"
          max="100"
          value={arraySize}
          disabled={isSorting}
          onChange={(e) => setArraySize(Number(e.target.value))}
        />

        <button onClick={reset} disabled={isSorting}>Reset</button>
        <button onClick={bubbleSort} disabled={isSorting}>Start Bubble Sort</button>
      </div>
    </div>
  );
}

export default BubbleSort;