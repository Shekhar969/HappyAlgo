import React, { useState } from "react";
import Searching from "./Algo/searching";
import Sorting from "./Algo/sorting";
import Other from "./Algo/other";

function MainBody() {
  const [selected, setSelected] = useState("");

  const components = {
    searching: Searching,
    sorting: Sorting,
    other: Other,
  };

  const SelectedComponent = components[selected];

  return (
    <div className="mainBodyContainer">
      {selected === "" ? (
        <div className="cards">
        <div className="card">  <Searching setSelected={setSelected} /></div>
        <div className="card">  <Sorting setSelected={setSelected} /></div>
        <div className="card">   <Other setSelected={setSelected} /></div>
        </div>
      ) : (
        <SelectedComponent isOnlyCard setSelected={setSelected} />
      )}
    </div>
  );
}

export default MainBody;
