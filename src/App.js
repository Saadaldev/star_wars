import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Character from "./components/character";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/navbar/Navbar";
import StarWarsContext from "./Context/StarWarsContext";
function App() {
  const [data, setData] = useState({});
  const value = { data, setData };
  return (
    <StarWarsContext.Provider value={value}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<Character />} />
      </Routes>
    </StarWarsContext.Provider>
  );
}

export default App;
