import "./App.css";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import Container from "./Container/container";


function App() {
  return (
    <BrowserRouter>
      <Container />
    </BrowserRouter>
  );
}

export default App;
