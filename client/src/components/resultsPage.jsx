import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Homehead from './homehead';
import './resultsPage.css';
function ResultsPage() {
    const location = useLocation();
    const { query } = location.state || {}; // Retrieve the query from state
    const [newsResults, setNewsResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (query) {
            const fetchData = async () => {
                const url = `http://localhost:3001/api/question/?query=${query}`;
                try {
                    const res = await fetch(url);
                    
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await res.json();
                    setNewsResults(data.articles || []); // Adjust to match the response structure
                } catch (error) {
                    setError(error.message);
                }
            };
            fetchData();
        }
    }, [query]);

    return (
        <>
            <Homehead/>
            <div>
                <h1>Search Results for: {query}</h1>
                {error && <p className="error-message">Error: {error}</p>}
                {newsResults.length > 0 ? (
                    <div className="results-container">
                        {newsResults.map((result, index) => (
                            <div className="results-item" key={index}>
                                <h2 className="results-title">{result.title}</h2>
                                <p className="results-description">{result.description}</p>
                                <a className="results-link" href={result.url} target="_blank" rel="noopener noreferrer">Read more</a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </>
    );
}

export default ResultsPage;
