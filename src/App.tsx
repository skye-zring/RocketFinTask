import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Navbar  from "./components/Navbar";
import Instrument from "./pages/Instrument";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-grow h-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/instrument/:ticker" element={<Instrument />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
