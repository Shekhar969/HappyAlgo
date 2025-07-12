import { useState, useEffect } from "react";
import { generateRandomArray } from "../../utils/randomArrayGen";
import './searching.module.css';

const LinearSearch = () => {
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState(generateRandomArray(arraySize));
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [logs, setLogs] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [manualMode, setManualMode] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    reset();
  }, [arraySize]);

  const reset = () => {
    setArray(generateRandomArray(arraySize));
    setTarget("");
    setCurrent(null);
    setFoundIndex(null);
    setLogs([]);
    setStepIndex(0);
    setIsRunning(false);
  };

  const handleSearch = async () => {
    const t = parseInt(target);
    if (isNaN(t)) {
      setLogs(["❗ Please enter a valid number to search."]);
      return;
    }

    setCurrent(null);
    setFoundIndex(null);
    setLogs([`🔍 Starting auto‑search for ${t}`]);
    setStepIndex(0);
    setIsRunning(true);

    for (let i = 0; i < array.length; i++) {
      if (manualMode) break;

      setCurrent(i);
      setLogs((L) => [...L, `Comparing array[${i}] (${array[i]}) with ${t}`]);
      await new Promise((r) => setTimeout(r, speed));

      if (array[i] === t) {
        setFoundIndex(i);
        setLogs((L) => [...L, `✅ Found ${t} at index ${i}`]);
        setIsRunning(false);
        return;
      }
    }

    if (!manualMode) {
      setLogs((L) => [...L, `❌ ${t} not found in the array`]);
      setIsRunning(false);
    }
  };

  const startManual = () => {
    const t = parseInt(target);
    if (isNaN(t)) {
      setLogs(["❗ Please enter a valid number to search."]);
      return;
    }

    setCurrent(null);
    setFoundIndex(null);
    setLogs([`🔍 Starting manual‑search for ${t}`]);
    setStepIndex(0);
    setIsRunning(true);
  };

  const manualStep = () => {
    const t = parseInt(target);
    if (!isRunning || stepIndex >= array.length) {
      setLogs((L) => [...L, `❌ ${t} not found after ${stepIndex} steps`]);
      setIsRunning(false);
      return;
    }

    const idx = stepIndex;
    setCurrent(idx);
    setLogs((L) => [...L, `Comparing array[${idx}] (${array[idx]}) with ${t}`]);

    if (array[idx] === t) {
      setFoundIndex(idx);
      setLogs((L) => [...L, `✅ Found ${t} at index ${idx}`]);
      setIsRunning(false);
    } else {
      setStepIndex(idx + 1);
    }
  };

  return (
    <div className="container">
      <h2>🔍 Linear Search Visualizer</h2>

      <div className="array">
        {array.map((num, idx) => (
          <div
            key={idx}
            className={`block ${
              idx === foundIndex
                ? "found"
                : idx === current
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
          <button onClick={handleSearch} disabled={isRunning}>
            Search
          </button>
        )}
        {manualMode && !isRunning && (
          <button onClick={startManual}>Start Manual</button>
        )}
        {manualMode && isRunning && (
          <button onClick={manualStep}>Next Step</button>
        )}

        <button
          onClick={() => {
            setManualMode(!manualMode);
            reset();
          }}
          disabled={isRunning}
        >
          {manualMode ? "Auto Mode" : "Manual Mode"}
        </button>

        <button onClick={reset} disabled={isRunning}>
          New Array
        </button>
      </div>

      {/* —— New Log Panel —— */}
      <div className="log-panel">
        <h3>Operation Log</h3>
        <div className="log-messages">
          {logs.length === 0 ? (
            <p className="log-empty">No operations yet</p>
          ) : (
            logs.map((line, i) => (
              <p key={i} className="log-line">
                {line}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LinearSearch;
