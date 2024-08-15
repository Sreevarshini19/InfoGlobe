// // client/src/components/UpcomingMovies.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UpcomingMovies = () => {
//     const [movies, setMovies] = useState([]);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchMovies = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get('http://localhost:3000/api/movies/upcoming-movies');
//                 console.log(response.data); // Log the response data
//                 setMovies(response.data); // Ensure this is an array
//                 setError('');
//             } catch (error) {
//                 setError('Error fetching movie data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMovies();
//     }, []);

//     return (
//         <div>
//             {loading && <p>Loading...</p>}
//             {error && <p>{error}</p>}
//             <div className="movies-list">
//                 {Array.isArray(movies) ? (
//                     movies.map((movie) => (
//                         <div key={movie.id} className="movie-item">
//                             <h1>{movie.title}</h1>
//                             <img src={movie.primaryImage?.url} alt={movie.title} />
//                             <p>{movie.releaseDate}</p>
//                             <p>Director: {movie.directors?.map(d => d.name).join(', ')}</p>
//                             <p>Actors: {movie.cast?.map(a => a.name).join(', ')}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No movies found</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UpcomingMovies;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UpcomingMovies = () => {
//     const [movies, setMovies] = useState([]);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchMovies = async () => {
//             setLoading(true);
//             try {
//                 // Fetch data from the API
//                 const response = await axios.get('http://localhost:3000/api/movies/upcoming-movies');
                
//                 // Log the response data to understand its structure
//                 console.log(response.data);
                
//                 // Access the correct property containing the movies
//                 const moviesData = response.data.movies || []; // Access `movies` property from response
//                 setMovies(moviesData); // Set the movies data
                
//                 setError('');
//             } catch (error) {
//                 setError('Error fetching movie data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMovies();
//     }, []);

//     return (
//         <div>
//             {loading && <p>Loading...</p>}
//             {error && <p>{error}</p>}
//             <div className="movies-list">
//                 {Array.isArray(movies) && movies.length > 0 ? (
//                     movies.map((movie, index) => (
//                         <div key={index} className="movie-item">
//                             <h1>{movie.title}</h1>
//                             <img src={movie.primaryImage?.url} alt={movie.title} />
//                             <p>{movie.releaseDate}</p>
//                             <p>Director: {movie.directors?.map(d => d.name).join(', ')}</p>
//                             <p>Actors: {movie.cast?.map(a => a.name).join(', ')}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No movies found</p>
//                 )}
//             </div>
//         </div>
//     );
// };
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpcomingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                // Fetch data from the API
                const response = await axios.get('http://localhost:3000/api/movies/upcoming-movies');
                
                // Log the response data to understand its structure
                console.log(response.data);
                
                // Extract movies from the nested structure
                const moviesData = response.data.movies.flatMap(movieEntry => movieEntry.list);
                setMovies(moviesData); // Set the movies data
                
                setError('');
            } catch (error) {
                setError('Error fetching movie data');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="movies-list">
                {Array.isArray(movies) && movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <div key={index} className="movie-item">
                            <h1>{movie.title}</h1>
                            <img src={movie.image} alt={movie.title} />
                            <p>Categories: {movie.categories.join(', ')}</p>
                            <p>Starring: {movie.staring.join(', ')}</p>
                            <a href={movie.link} target="_blank" rel="noopener noreferrer">More Info</a>
                        </div>
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </div>
    );
};

export default UpcomingMovies;
