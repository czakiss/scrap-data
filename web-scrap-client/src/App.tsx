import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import DataAnalyzer from "./components/DataAnalyzer/DataAnalyzer";

function App() {
  return (
    <div className="App">
      <Header />
      <DataAnalyzer />
    </div>
  );
}

export default App;
