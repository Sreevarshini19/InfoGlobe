// // // src/components/MovieSearch.jsx
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import './moviesearch.css';
// // const MovieSearch = () => {
// //     const [movieTitle, setMovieTitle] = useState('');
// //     const [movieData, setMovieData] = useState(null);
// //     const [error, setError] = useState('');
// //     const [loading, setLoading] = useState(false);

// //     const fetchMovieData = async (title) => {
// //         const apiKey = 'fd4186ed'; // Replace with your OMDB API key
// //         try {
// //             setLoading(true);
// //             const response = await axios.get(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
// //             setMovieData(response.data);
// //             setError('');
// //         } catch (error) {
// //             setError('Error fetching movie data');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleSearch = () => {
// //         fetchMovieData(movieTitle);
// //     };

// //     return (
// //         <div>
// //             <input
// //                 type="text"
// //                 value={movieTitle}
// //                 onChange={(e) => setMovieTitle(e.target.value)}
// //                 placeholder="Enter movie title"
// //             />
// //             <button onClick={handleSearch}>Search</button>

// //             {loading && <p>Loading...</p>}
// //             {error && <p>{error}</p>}

// //             {movieData && !error && !loading && (
// //                 <div>
// //                     <h1>{movieData.Title}</h1>
// //                     <img src={movieData.Poster} alt={movieData.Title} />
// //                     <p>{movieData.Plot}</p>
// //                     <p>Year: {movieData.Year}</p>
// //                     <p>Director: {movieData.Director}</p>
// //                     <p>Actors: {movieData.Actors}</p>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default MovieSearch;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './moviesearch.css';

// const MovieSearch = () => {
//     const [movies, setMovies] = useState([]);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     const fetchCurrentlyRunningMovies = async () => {
//         const options = {
//             method: 'GET',
//             url: 'https://moviedatabase8.p.rapidapi.com/Search/Incep',
//             headers: {
//                 'x-rapidapi-host': 'moviedatabase8.p.rapidapi.com',
//                 'x-rapidapi-key': 'b28641226fmshfb04f7e7d9ae708p19b512jsn119e67624875'  // Replace with your RapidAPI key
//             }
//         };

//         try {
//             setLoading(true);
//             const response = await axios.request(options);
//             setMovies(response.data.results);
//             setError('');
//         } catch (error) {
//             setError('Error fetching movie data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container">
//             <button onClick={fetchCurrentlyRunningMovies}>Fetch Currently Running Movies</button>
//             {loading && <p>Loading...</p>}
//             {error && <p>{error}</p>}
//             <div className="movies-list">
//                 {movies.map((movie) => (
//                     <div key={movie.id} className="movie-item">
//                         <h1>{movie.title}</h1>
//                         <img src={movie.primaryImage?.url} alt={movie.title} />
//                         <p>{movie.releaseDate}</p>
//                         <p>Director: {movie.directors?.map(d => d.name).join(', ')}</p>
//                         <p>Actors: {movie.cast?.map(a => a.name).join(', ')}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MovieSearch;

import React, { useState } from 'react';
import axios from 'axios';
// import './MovieSearch.css';

const MovieSearch = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchCurrentlyRunningMovies = async () => {
        const options = {
            method: 'GET',
            url: 'https://moviedatabase8.p.rapidapi.com/Search/Incep',
            headers: {
                'x-rapidapi-host': 'moviedatabase8.p.rapidapi.com',
                'x-rapidapi-key': 'fd4186ed'  // Replace with your RapidAPI key
            }
        };

        try {
            setLoading(true);
            const response = await axios.request(options);
            setMovies(response.data.results);
            setError('');
        } catch (error) {
            setError('Error fetching movie data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <button onClick={fetchCurrentlyRunningMovies}>Fetch Currently Running Movies</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="movies-list">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-item">
                        <h1>{movie.title}</h1>
                        <img src={movie.primaryImage?.url} alt={movie.title} />
                        <p>{movie.releaseDate}</p>
                        <p>Director: {movie.directors?.map(d => d.name).join(', ')}</p>
                        <p>Actors: {movie.cast?.map(a => a.name).join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieSearch;
