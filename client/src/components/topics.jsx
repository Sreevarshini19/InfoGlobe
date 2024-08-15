import React, { useState, useEffect } from "react";
import './topics.css';
import Homehead from "./homehead";
import Home from "./home";

function Topics({topic}) {
    const [news, setNews] = useState([]);
    const [cntry, setCountry] = useState('us'); // Default to US
   const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            const url = `http://localhost:3001/api/news/topic?topic=${topic}&country=${cntry}`;
            try {
                console.log("Fetching News");
                let res = await fetch(url);
                console.log(res);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await res.json();
                if (data.status === 'ok') {
                    const filteredArticles = data.articles.filter(article => {
                        return (
                            article.title !== '[Removed]' &&
                            article.description !== '[Removed]' &&
                            article.content !== '[Removed]'
                        );
                    });
                    setNews(filteredArticles);
                } else {
                    setError(data.message || 'Failed to fetch headlines');
                }
            } catch (error) {
                console.log(error);
                setError(error.message);
            }
        };

        fetchNews();
    }, [ cntry]); // Dependency array to refetch when lang or cntry changes

    return (
        <>
        <Homehead/>
            <div className="headlines">
                <h2 style={{ textAlign: "center" }}></h2>
                <div style={{ textAlign: "center", marginBottom: "20px" }} className="filter">
                    <label>
                        Country:
                        <select value={cntry} onChange={(e) => setCountry(e.target.value)}>
                            <option value="us">United States</option>
                            <option value="in">India</option>
                            <option value="gb">United Kingdom</option>
                            <option value="au">Australia</option>
                            <option value="ca">Canada</option>
                        </select>
                    </label>
                   
                </div>
                {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
                <div className="every">
                    {news.map((each, index) => (
                        <div className="eachevery" key={index} style={{border: "1px solid #ccc", margin: "10px", padding: "10px"}}>
                            <h3>{each.title}</h3>
                            <p><strong>Author:</strong> {each.author || "Unknown"}</p>
                            <p><strong>Source:</strong> {each.source.name}</p>
                            <p>{each.description}</p>
                            <p>{each.content}</p>
                            <a href={each.url} target="_blank" rel="noopener noreferrer">Read more</a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Topics;
