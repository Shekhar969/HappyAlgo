import React from "react";

function Other({ setSelected, isOnlyCard }) {
  const handleClick = () => {
    if (!isOnlyCard) setSelected("other");
  };

  return (
    <div
      className="mainContainerPathfinding"
      onClick={handleClick}
    >
      <h3>
        <strong>Pathfinding Algorithms</strong>
      </h3>
      <div className="pathfindingHeader">
        <div className="pathfindingAlgos">A* Search</div>
        <div className="pathfindingAlgos">Dijkstra's Algorithm</div>
        <div className="pathfindingAlgos">Breadth-First Search (BFS)</div>
        <div className="pathfindingAlgos">Depth-First Search (DFS)</div>
      </div>
      <div className="pathfindingDescription">
        Pathfinding algorithms are used to find the shortest or most efficient
        path from a starting point to a destination. These algorithms are widely
        used in navigation systems, games, and robotics.
      </div>

      {isOnlyCard && (
        <button onClick={() => setSelected("")} style={{ marginTop: "1rem" }}>
          ⬅ Back to All
        </button>
      )}
    </div>
  );
}

export default Other;
