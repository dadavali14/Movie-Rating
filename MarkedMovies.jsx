import React, { useState, useEffect } from 'react';
import api from "../api.jsx";
import { Check, Star, X } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.css';

const MarkedMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMarkedMovies();
  }, []);

  const loadMarkedMovies = async () => {
    const { data } = await api.getMovies();
    setMovies(data.filter(movie => movie.isWatched));
  };

  const unmarkMovie = async (movie) => {
    await api.updateMovie(movie.id, {
      ...movie,
      isWatched: false
    });
    loadMarkedMovies();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Watched Movies</h2>
      
      {movies.length === 0 ? (
        <div className="text-center py-4 bg-white rounded shadow">
          <p className="text-muted">You haven't marked any movies as watched</p>
        </div>
      ) : (
        <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-3">
          {movies.map(movie => (
            <div key={movie.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="position-relative">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="card-img-top"
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      objectPosition: 'top'
                    }}
                  />
                  <div className="position-absolute top-0 end-0 m-2 bg-success rounded-circle p-1">
                    <Check size={16} color="white" />
                  </div>
                </div>
                <div className="card-body p-2">
                  <h6 className="card-title text-truncate mb-1" title={movie.title}>
                    {movie.title}
                  </h6>
                  <p className="card-text mb-1 small text-muted text-truncate" title={`Director: ${movie.director}`}>
                    Director: {movie.director}
                  </p>
                  <p className="card-text mb-1 small text-muted text-truncate" title={`Hero: ${movie.hero}`}>
                    Hero: {movie.hero}
                  </p>
                  <p className="card-text mb-1 small text-muted text-truncate" title={`Heroine: ${movie.heroine}`}>
                    Heroine: {movie.heroine}
                  </p>
                  <p className="card-text small text-muted mb-2" style={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    height: '2.4em'
                  }}>
                    {movie.summary}
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-1">
                      <Star size={16} className="text-warning" style={{ fill: '#ffc107' }} />
                      <small className="text-muted">
                        {movie.averageRating?.toFixed(1) || 'N/A'}/10
                      </small>
                    </div>
                    <button
                      onClick={() => unmarkMovie(movie)}
                      className="btn btn-sm text-secondary"
                      aria-label="Remove from watched"
                    >
                      <X size={16} />
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

export default MarkedMovies;