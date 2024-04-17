import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Pokemon from './pages/Pokemon';

function App() {
  return (
    <Router basename='/pokedex' >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pokemon/:id" element={<Pokemon />} /> 
      </Routes>
    </Router>
  );
}

export default App;
