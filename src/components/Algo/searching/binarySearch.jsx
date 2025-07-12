import React, { useState, useEffect } from "react";
import { generateRandomArray } from "../../utils/randomArrayGen";
import './searching.module.css';

class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  getTree() {
    return this.root;
  }
}

function TreeNode({ node, x, y, levelGap, siblingGap, highlight, foundValue, notFoundValue, midNodes }) {
  if (!node) return null;
  const isFound = node.value === foundValue;
  const isNotFound = node.value === notFoundValue;
  const isMid = midNodes.includes(node.value);
  const leftX = x - siblingGap;
  const rightX = x + siblingGap;
  const nextY = y + levelGap;
  return (
    <g>
      {node.left && <line x1={x} y1={y} x2={leftX} y2={nextY} className="tree-line" />}
      {node.right && <line x1={x} y1={y} x2={rightX} y2={nextY} className="tree-line" />}
      <circle
        cx={x}
        cy={y}
        r={20}
        className={`tree-node ${highlight.includes(node.value) ? "highlight" : ""} ${isFound ? "found" : ""} ${isNotFound ? "not-found" : ""} ${isMid ? "mid-node" : ""}`}
      />
      <text x={x} y={y + 5} className="tree-label">
        {node.value}
      </text>
      {node.left && (
        <TreeNode
          node={node.left}
          x={leftX}
          y={nextY}
          levelGap={levelGap}
          siblingGap={siblingGap / 1.5}
          highlight={highlight}
          foundValue={foundValue}
          notFoundValue={notFoundValue}
          midNodes={midNodes}
        />
      )}
      {node.right && (
        <TreeNode
          node={node.right}
          x={rightX}
          y={nextY}
          levelGap={levelGap}
          siblingGap={siblingGap / 1.5}
          highlight={highlight}
          foundValue={foundValue}
          notFoundValue={notFoundValue}
          midNodes={midNodes}
        />
      )}
    </g>
  );
}

const BinaryTreeVisualizer = () => {
  const [bst, setBst] = useState(new BinarySearchTree());
  const [treeData, setTreeData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [foundValue, setFoundValue] = useState(null);
  const [notFoundValue, setNotFoundValue] = useState(null);
  const [midNodes, setMidNodes] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [arraySize, setArraySize] = useState(7);
  const [logs, setLogs] = useState([]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const updateTreeData = (tree) => {
    setTreeData(tree.getTree());
  };

  const handleInsert = () => {
    if (!isNaN(inputValue) && inputValue !== "") {
      bst.insert(Number(inputValue));
      updateTreeData(bst);
      setInputValue("");
      setLogs((prev) => [...prev, `Inserted ${inputValue}`]);
    }
  };

  const handleGenerateRandom = () => {
    const newTree = new BinarySearchTree();
    const arr = generateRandomArray(arraySize, 1, 99);
    const mids = [];
    const buildBalancedBST = (tree, sortedArray, start, end) => {
      if (start > end) return;
      const mid = Math.floor((start + end) / 2);
      mids.push(sortedArray[mid]);
      tree.insert(sortedArray[mid]);
      buildBalancedBST(tree, sortedArray, start, mid - 1);
      buildBalancedBST(tree, sortedArray, mid + 1, end);
    };
    const sortedArr = [...arr].sort((a, b) => a - b);
    buildBalancedBST(newTree, sortedArr, 0, sortedArr.length - 1);

    setBst(newTree);
    updateTreeData(newTree);
    setHighlightedNodes([]);
    setFoundValue(null);
    setNotFoundValue(null);
    setMidNodes(mids);
    setLogs([
      `Generated random array [${arr.join(", ")}]`,
      `Sorted to [${sortedArr.join(", ")}]`,
      `Built balanced BST with mids [${mids.join(", ")}]`
    ]);
  };

  const handleSearch = async () => {
    const value = Number(searchValue);
    if (isNaN(value) || searchValue === "") return;

    let current = bst.root;
    const path = [];
    const newLogs = [`Starting search for ${value}`];
    setLogs(newLogs);
    setFoundValue(null);
    setNotFoundValue(null);

    while (current) {
      path.push(current.value);
      setHighlightedNodes([...path]);
      newLogs.push(`At node ${current.value}`);
      if (value < current.value) {
        newLogs.push(`Target ${value} < ${current.value}: Going left`);
        current = current.left;
      } else if (value > current.value) {
        newLogs.push(`Target ${value} > ${current.value}: Going right`);
        current = current.right;
      } else {
        newLogs.push(`🎯 Found ${value} at node ${current.value}`);
        setFoundValue(current.value);
        setLogs([...newLogs]);
        return;
      }
      setLogs([...newLogs]);
      await sleep(speed);
    }
    // Not found
    const last = path[path.length - 1];
    newLogs.push(`❌ ${value} not found; stopped at node ${last}`);
    setNotFoundValue(last);
    setLogs(newLogs);
  };

  useEffect(() => {
    handleGenerateRandom();
  }, []);

  return (
    <div className="bst-container">
      <h2 className="bst-title">Binary Search Tree Visualizer</h2>
      <div className="bst-controls">
        <input
          type="number"
          placeholder="Insert value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bst-input"
        />
        <button className="bst-button insert" onClick={handleInsert}>
          Insert
        </button>
        <input
          type="number"
          placeholder="Search value"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bst-input"
        />
        <button className="bst-button search" onClick={handleSearch}>
          Search
        </button>
        <input
          type="range"
          min={100}
          max={1000}
          step={100}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="bst-slider"
        />
        <span>Speed: {speed}ms</span>
        <input
          type="range"
          min={3}
          max={15}
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          className="bst-slider"
        />
        <span>Array Size: {arraySize}</span>
        <button className="bst-button random" onClick={handleGenerateRandom}>
          Generate Random
        </button>
      </div>
      <div className="bst-canvas">
        <svg width="1000" height="500">
          {treeData ? (
            <TreeNode
              node={treeData}
              x={500}
              y={40}
              levelGap={80}
              siblingGap={200}
              highlight={highlightedNodes}
              foundValue={foundValue}
              notFoundValue={notFoundValue}
              midNodes={midNodes}
            />
          ) : (
            <text x="50%" y="50%" textAnchor="middle">No tree data</text>
          )}
        </svg>
      </div>
      <div className="bst-log">
        <h3 className="bst-log-title">Operation Log</h3>
        <div className="bst-log-messages">
          {logs.length === 0 && <p className="log-empty">No operations yet</p>}
          {logs.map((log, i) => (
            <p key={i} className="log-line">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BinaryTreeVisualizer;