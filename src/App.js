
import React from "react";
import Sidebar from "./Components/Sidebar";
import './App.css';

function App() {
  const role = "approver"; // try: creator | manager | approver

  return (
    <div className="app">
      <Sidebar role={role} />
      <div class="content">
        
      </div>
    </div>
  );
}

export default App;

