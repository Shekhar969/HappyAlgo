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
          <Searching setSelected={setSelected}  />
          <Sorting setSelected={setSelected} />
          <Other setSelected={setSelected} />
        </div>
      ) : (
        <SelectedComponent isOnlyCard setSelected={setSelected} />
      )}
    </div>
  );
}

export default MainBody;
