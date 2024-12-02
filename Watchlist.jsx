import React, { useState, useEffect } from 'react';
import api from '../api.jsx';
import { Heart, Trash2 } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.css';

const Watchlist = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    const { data } = await api.getMovies();
    setMovies(data.filter(movie => movie.isWatchlisted));
  };

  const removeFromWatchlist = async (movie) => {
    await api.updateMovie(movie.id, {
      ...movie,
      isWatchlisted: false
    });
    loadWatchlist();
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 fw-bold">My Watchlist</h2>
      
      {movies.length === 0 ? (
        <div className="text-center py-4 bg-white rounded shadow">
          <p className="text-muted">Your watchlist is empty</p>
        </div>
      ) : (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
          {movies.map(movie => (
            <div key={movie.id} className="col">
              <div className="card h-100" style={{ maxWidth: '280px', margin: '0 auto' }}>
                <div style={{ height: '280px' }}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-100 h-100"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="card-body p-2">
                  <h3 className="card-title h6 fw-bold mb-1" style={{ fontSize: '0.9rem' }}>{movie.title}</h3>
                  <p className="card-text small text-muted mb-2" style={{ fontSize: '0.8rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{movie.summary}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <Heart size={16} className="text-danger" style={{ fill: 'red' }} />
                      <span className="ms-1" style={{ fontSize: '0.75rem' }}>Watchlist</span>
                    </div>
                    <button
                      onClick={() => removeFromWatchlist(movie)}
                      className="btn btn-link text-muted p-0"
                      aria-label="Remove from watchlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;