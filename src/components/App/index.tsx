import React from "react";

import Filters from "../Filters";
import DataGrid from "../DataGrid";

import "./index.scss";

const App = () => {
  return (
    <div className="app-container">
      <Filters />
      <DataGrid />
    </div>
  );
};

export default App;
