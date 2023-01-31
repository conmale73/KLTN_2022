import React, { useState } from "react";

import Sidebar from "./Sidebar";

function App() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="app">
      <button onClick={() => setOpen(!isOpen)}>Toggle Sidebar</button>
      <Sidebar isOpen={isOpen} />
    </div>
  );
}

export default App;