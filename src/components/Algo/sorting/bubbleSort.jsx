import React,{useState} from 'react';
import { generateRandomArray } from "../../utils/randomArrayGen";
import '../../../App.css';

function BubbleSort() {
    const [arraySize, setArraySize] = useState(10);
    const [array, setArray] = useState(generateRandomArray(arraySize));
    const [logs, setLogs] = useState([]);
    return (
        <div className='mainContainer'>
                  <div className="array">
        {array.map((num, idx) => (
          <div
            key={idx}
            className={`block ${
                logs.includes(idx) ? "highlighted" : ""
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
        />

        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default BubbleSort;