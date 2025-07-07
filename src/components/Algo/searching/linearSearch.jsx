// src/components/LinearSearch.jsx
import { useState, useEffect } from "react";
import { generateRandomArray } from "../../utils/randomArrayGen";
import '../../../App.css'

const LinearSearch = () => {
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState(generateRandomArray(arraySize));
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [log, setLog] = useState("");
  const [speed, setSpeed] = useState(500);
  const [manualMode, setManualMode] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [searchAbort, setSearchAbort] = useState(false);

  useEffect(() => {
    setArray(generateRandomArray(arraySize));
    setCurrent(null);
    setFoundIndex(null);
    setLog("");
    setTarget("");
    setStepIndex(0);
    setIsRunning(false);
  }, [arraySize]);

  const handleSearch = async () => {
    if (!target || isNaN(parseInt(target))) {
      setLog("❗ Please enter a valid number to search.");
      return;
    }

    setCurrent(null);
    setFoundIndex(null);
    setLog("");
    setStepIndex(0);
    setIsRunning(true);
    setSearchAbort(false);

    for (let i = 0; i < array.length; i++) {
      if (manualMode || searchAbort) return;

      setCurrent(i);
      setLog(`Comparing ${array[i]} with ${target}`);

      const currentSpeed = speed;
      await new Promise((r) => setTimeout(r, currentSpeed));

      if (array[i] === parseInt(target)) {
        setFoundIndex(i);
        setLog(`✅ Found ${target} at index ${i}`);
        setIsRunning(false);
        return;
      }
    }

    setLog(`❌ ${target} not found`);
    setIsRunning(false);
  };

  const runManualStep = () => {
    if (!target || isNaN(parseInt(target))) {
      setLog("❗ Please enter a valid number to search.");
      return;
    }

    if (!isRunning || stepIndex >= array.length) {
      setLog("❌ Target not found");
      setIsRunning(false);
      return;
    }

    const value = array[stepIndex];
    setCurrent(stepIndex);
    setLog(`Comparing ${value} with ${target}`);

    if (value === parseInt(target)) {
      setFoundIndex(stepIndex);
      setLog(`✅ Found ${target} at index ${stepIndex}`);
      setIsRunning(false);
      return;
    }

    setStepIndex(stepIndex + 1);
  };

  const startManualSearch = () => {
    if (!target || isNaN(parseInt(target))) {
      setLog("❗ Please enter a valid number to search.");
      return;
    }

    setCurrent(null);
    setFoundIndex(null);
    setLog("");
    setStepIndex(0);
    setIsRunning(true);
    setSearchAbort(false);
  };

  const regenerateArray = () => {
    if (isRunning) return;
    setArray(generateRandomArray(arraySize));
    setTarget("");
    setCurrent(null);
    setFoundIndex(null);
    setLog("");
    setStepIndex(0);
    setIsRunning(false);
  };

  return (
    <div className="container">
      <h2>🔍 Linear Search Visualizer</h2>

      <div className="array">
        {array.map((num, index) => (
          <div
            key={index}
            className={`block ${
              index === foundIndex
                ? "found"
                : index === current
                ? "checking"
                : ""
            }`}
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
          onChange={(e) => setArraySize(Number(e.target.value))}
          disabled={isRunning}
        />

        <label>Speed: {speed} ms</label>
        <input
          type="range"
          min="5"
          max="1000"
          step="50"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isRunning}
        />

        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter number to search"
          disabled={isRunning}
        />

        {!manualMode && (
          <button onClick={handleSearch} disabled={isRunning}>Search</button>
        )}
        {manualMode && !isRunning && (
          <button onClick={startManualSearch}>Start Manual</button>
        )}
        {manualMode && isRunning && (
          <button onClick={runManualStep}>Next Step</button>
        )}

        <button onClick={() => setManualMode(!manualMode)} disabled={isRunning}>
          {manualMode ? "Switch to Auto Mode" : "Switch to Manual Mode"}
        </button>

        <button onClick={regenerateArray}>New Array</button>
      </div>

      <p className="log-window">Status: {log}</p>
    </div>
  );
};

export default LinearSearch;