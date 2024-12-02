import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import AddMovie from './components/AddMovie.jsx';
import RateMovie from './components/RateMovie.jsx';

import FilterMovies from './components/FilterMovies.jsx';
import Watchlist from './components/Watchlist.jsx';
import MarkedMovies from './components/MarkedMovies.jsx';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/rate-movie" element={<RateMovie />} />
            {/* <Route path="/movie-ratings" element={<MovieRatings />} /> */}
            <Route path="/filter-movies" element={<FilterMovies />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/marked-movies" element={<MarkedMovies />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;