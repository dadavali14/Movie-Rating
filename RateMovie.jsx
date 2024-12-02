import React, { useState, useEffect } from 'react';
import api from '../api.jsx';
import { Star } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.css';

const RateMovie = () => {
  const [movies, setMovies] = useState([]);
  const [userId] = useState('user1'); // In a real app, this would come from authentication

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const { data } = await api.getMovies();
    setMovies(data);
  };

  const handleRate = async (movieId, rating) => {
    await api.addRating(movieId, rating, userId);
    loadMovies();
  };

  return (
    <div className="container mt-4">
      <h2 className="h4 mb-4">Rate Movies</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {movies.map(movie => (
          <div key={movie.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="row g-0">
                <div className="col-4">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="img-fluid rounded-start"
                    style={{ 
                      height: '200px',
                      width: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top'
                    }}
                  />
                </div>
                <div className="col-8">
                  <div className="card-body p-2">
                    <h6 className="card-title text-truncate mb-1" title={movie.title}>
                      {movie.title}
                    </h6>
                    <p className="card-text small text-muted mb-2">
                      Director: {movie.director}
                    </p>

                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {[...Array(10)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handleRate(movie.id, i + 1)}
                          className="btn btn-link p-0 me-1"
                          style={{ lineHeight: 1 }}
                        >
                          <Star
                            size={16}
                            className={
                              movie.ratings.some(r => r.userId === userId && r.rating > i)
                                ? 'text-warning fill-warning'
                                : 'text-secondary'
                            }
                          />
                        </button>
                      ))}
                    </div>

                    <p className="card-text small text-muted mb-0">
                      Current rating: {movie.averageRating?.toFixed(1) || 'N/A'}/10
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RateMovie;