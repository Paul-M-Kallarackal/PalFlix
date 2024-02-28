import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import GenreMovies from './components/GenreMovies';
import MovieDescription from './components/MovieDescription';
import SpecialMovies from './components/SpecialMovies';
import CrewDescription from './components/CrewDescription';
import ActorDescription from './components/ActorDescription';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/register" element={<Register />}  />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/title/:movieId" element={<MovieDescription/>} />
          <Route path="/genres/:genreId" element={<GenreMovies/>} />
          <Route path="/movies/:movieType" element={<SpecialMovies/>} />
          <Route path="/actors/:actorId" element={<ActorDescription/>} />
          <Route path="/crew/:crewId" element={<CrewDescription/>} />
        </Routes>
      </BrowserRouter>
    
    </>
  );
}

export default App;
