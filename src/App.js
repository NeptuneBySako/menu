import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./screens/Menu/Menu";
import Dashboard from "./screens/Dashboard";
function App() {
  return (
    <div className="App p-5">
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
