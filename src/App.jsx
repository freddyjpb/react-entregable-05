import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import ProtectedRoutes from './components/ProtectedRoutes';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import PokedexId from './pages/PokedexId';
import Config from './pages/Config';

function App() {
  return (
    <div className="App" id='light'>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* Protected route */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokedex/:id' element={<PokedexId />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App