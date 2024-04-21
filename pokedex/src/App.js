import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import PokemonDetails from './components/PokemonDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} /> 
      </Routes>
    </Router>
  );
}

export default App;
