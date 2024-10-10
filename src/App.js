import "./App.css";
<<<<<<< HEAD
import { HashRouter as Router, Route, Routes } from "react-router-dom";
=======
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
>>>>>>> 73bd87ac384d0aef8465fc63e02e5a61f935f578
import Menu from "./screens/Menu/Menu";
import Dashboard from "./screens/Dashboard";
function App() {
  return (
    <div className="App">
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
