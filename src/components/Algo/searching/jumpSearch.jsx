import React, { useState, useEffect } from "react";
import { generateRandomArray } from "../../utils/randomArrayGen";
import './searching.module.css';

const JumpSearch = () => {
  const [arraySize, setArraySize] = useState(20);
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [logs, setLogs] = useState([]);
  const [blockSize, setBlockSize] = useState(5);
  const [speed, setSpeed] = useState(500);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    reset();
  }, [arraySize]);

  const reset = () => {
    const arr = generateRandomArray(arraySize, 1, arraySize * 5).sort((a, b) => a - b);
    setArray(arr);
    setTarget("");
    setCurrentIndex(null);
    setFoundIndex(null);
    setLogs([]);
    setIsRunning(false);
    setBlockSize(Math.max(1, Math.floor(Math.sqrt(arraySize))));
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const handleJumpSearch = async () => {
    if (array.length === 0) {
      setLogs(["❗ Array is empty"]);
      return;
    }

    const t = Number(target);
    if (isNaN(t)) {
      setLogs(["❗ Enter a valid number."]);
      return;
    }
    
    setLogs([`🔍 Starting jump search for ${t}`]);
    setIsRunning(true);
    let prev = 0;
    const step = blockSize;
    const n = array.length;

    // Jump phase
    while (prev < n && array[Math.min(prev, n - 1)] < t) {
      setCurrentIndex(Math.min(prev, n - 1));
      setLogs((l) => [...l, `Jumping to index ${Math.min(prev, n - 1)} (value ${array[Math.min(prev, n - 1)]})`]);
      await sleep(speed);
      prev += step;
    }

    // Determine search bounds
    const start = Math.max(0, prev - step);
    const end = Math.min(prev, n - 1); // This now properly includes the last element
    
    setLogs((l) => [...l, `🔍 Linear search between indexes ${start} and ${end}`]);

    // Linear search within block
    for (let i = start; i <= end; i++) {
      setCurrentIndex(i);
      setLogs((l) => [...l, `Comparing index ${i}: ${array[i]} with ${t}`]);
      await sleep(speed);
      if (array[i] === t) {
        setFoundIndex(i);
        setLogs((l) => [...l, `✅ Found ${t} at index ${i}`]);
        setIsRunning(false);
        return;
      }
    }

    setLogs((l) => [...l, `❌ ${t} not found in the array`]);
    setIsRunning(false);
  };

  return (
    <div className="jump-container">
      <h2 className="jump-title">🦘 Jump Search Visualizer</h2>

      <div className="jump-array">
        {array.map((num, idx) => (
          <div
            key={idx}
            className={`jump-block ${idx === foundIndex ? 'jump-found' : idx === currentIndex ? 'jump-checking' : ''}`}
          >
            {num}
          </div>
        ))}
      </div>

      <div className="jump-controls">
        <label>Array Size: {arraySize}</label>
        <input type="range" min="5" max="100" value={arraySize} onChange={e => setArraySize(Number(e.target.value))} disabled={isRunning}/>

        <label>Speed: {speed} ms</label>
        <input type="range" min="50" max="2000" step="50" value={speed} onChange={e => setSpeed(Number(e.target.value))} disabled={isRunning}/>

        <label>Block Size: {blockSize}</label>
        <input type="number" min="1" max={arraySize} value={blockSize} onChange={e => setBlockSize(Math.min(arraySize, Math.max(1, Number(e.target.value))))} disabled={isRunning}/>

        <input type="number" value={target} onChange={e => setTarget(e.target.value)} placeholder="Enter target" disabled={isRunning}/>

        <button className="jump-button" onClick={handleJumpSearch} disabled={isRunning}>Search</button>
        <button className="jump-button" onClick={reset} disabled={isRunning}>New Array</button>
      </div>

      <div className="jump-log-panel">
        <h3>Operation Log</h3>
        <div className="jump-log-messages">
          {logs.length === 0 ? (
            <p className="jump-log-empty">No operations yet</p>
          ) : (
            logs.map((l, i) => <p key={i} className="jump-log-line">{l}</p>)
          )}
        </div>
      </div>
    </div>
  );
};

export default JumpSearch;