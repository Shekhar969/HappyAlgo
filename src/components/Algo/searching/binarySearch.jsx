import React, { useState } from "react";
import { generateRandomArray } from "../../utils/randomArrayGen";
import '../../../App.css';

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

function TreeNode({ node, x, y, levelGap, siblingGap, highlight }) {
  if (!node) return null;

  const leftX = x - siblingGap;
  const rightX = x + siblingGap;
  const nextY = y + levelGap;

  return (
    <>
      {node.left && (
        <line x1={x} y1={y} x2={leftX} y2={nextY} className="tree-line" />
      )}
      {node.right && (
        <line x1={x} y1={y} x2={rightX} y2={nextY} className="tree-line" />
      )}

      <circle
        cx={x}
        cy={y}
        r={20}
        className={`tree-node ${highlight.includes(node.value) ? "highlight" : ""}`}
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
        />
      )}
    </>
  );
}

const BinaryTreeVisualizer = () => {
  const [bst, setBst] = useState(new BinarySearchTree());
  const [treeData, setTreeData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [arraySize, setArraySize] = useState(7);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleInsert = () => {
    if (!isNaN(inputValue)) {
      bst.insert(Number(inputValue));
      setTreeData({ ...bst.getTree() });
      setInputValue("");
    }
  };

  const handleGenerateRandom = () => {
    const newTree = new BinarySearchTree();
    const arr = generateRandomArray(arraySize, 1, 99);
    arr.forEach((val) => newTree.insert(val));
    setBst(newTree);
    setTreeData({ ...newTree.getTree() });
    setHighlightedNodes([]);
  };

  const handleSearch = async () => {
    const value = Number(searchValue);
    if (isNaN(value)) return;
    let current = bst.root;
    const path = [];

    while (current) {
      path.push(current.value);
      setHighlightedNodes([...path]);
      await sleep(speed);
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        break;
      }
    }
  };

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
          {treeData && (
            <TreeNode
              node={treeData}
              x={500}
              y={40}
              levelGap={80}
              siblingGap={200}
              highlight={highlightedNodes}
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default BinaryTreeVisualizer;
