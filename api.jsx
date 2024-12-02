import axios from 'axios';

const API_URL = 'http://localhost:3000';

 const api = {
  getMovies: () => axios.get(`${API_URL}/movies`),
  addMovie: (movie) => axios.post(`${API_URL}/movies`, movie),
  updateMovie: (id, movie) => axios.put(`${API_URL}/movies/${id}`, movie),
  deleteMovie: (id) => axios.delete(`${API_URL}/movies/${id}`),
  addRating: async (movieId, rating, userId) => {
    const { data: movie } = await axios.get(`${API_URL}/movies/${movieId}`);
    const newRatings = [...movie.ratings, { userId, rating }];
    const averageRating = newRatings.reduce((acc, r) => acc + r.rating, 0) / newRatings.length;
    return axios.put(`${API_URL}/movies/${movieId}`, {
      ...movie,
      ratings: newRatings,
      averageRating
    });
  }
};
export default api;