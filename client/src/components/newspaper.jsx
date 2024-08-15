import React, { useState, useEffect } from "react";
import './headlines.css';
import Homehead from "./homehead";
import './newspaper.css';

function Newspaper({ type }) {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            const url = `http://localhost:3001/api/newspaper/?type=${type}`;
            try {
                console.log(`Fetching News from ${type}`);
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                console.log(data);
                setNews(data.news_results || []); // Adjust to match the response structure
                
            } catch (error) {
                console.error(error);
                setError(error.message);
            }
        };

        fetchNews();
    }, [type]); 

    return (
        <>
            <Homehead/>
            <div className="headlines">
                <h2 style={{ textAlign: "center" }}>{type}</h2>
                {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
                <div className="every news-container">
                    {news.length === 0 && !error && <p style={{ textAlign: 'center' }}>No news available.</p>}
                    {news.map((item, index) => (
                        <div className="news-item" key={index}>
                            <div className="news-header">
                                {/* <img src={item.source.icon} alt={item.source.name} className="news-icon" /> */}
                                <h3 className="news-title">{item.title}</h3>
                            </div>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="news-link">Read more</a>
                            {item.source.authors && (
                                <p className="news-authors">Authors: {item.source.authors.join(', ')}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Newspaper;
