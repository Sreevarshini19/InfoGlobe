import React, { useState, useEffect } from "react";
import './topics.css';
import Homehead from "./homehead";
import Home from "./home";

function Country() {
    const [news, setNews] = useState([]);
    const [cntry, setCountry] = useState('us'); // Default to US
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            const url = `http://localhost:3001/api/country/?country=${cntry}`;
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
                <h2 style={{ textAlign: "center" }}>Today's Top Headlines</h2>
                <div style={{ textAlign: "center", marginBottom: "20px" ,marginTop:"20px"}} className="filter">
                    <label>
                        Country:
                        <select value={cntry} onChange={(e) => setCountry(e.target.value)}>
    
                        <option value="ar">Argentina</option>
                        <option value="au">Australia</option>
                        <option value="at">Austria</option>
                        <option value="be">Belgium</option>
                        <option value="br">Brazil</option>
                        <option value="bg">Bulgaria</option>
                        <option value="ca">Canada</option>
                        <option value="cn">China</option>
                        <option value="co">Colombia</option>
                        <option value="cu">Cuba</option>
                        <option value="cz">Czech Republic</option>
                        <option value="eg">Egypt</option>
                        <option value="fr">France</option>
                        <option value="de">Germany</option>
                        <option value="gr">Greece</option>
                        <option value="hk">Hong Kong</option>
                        <option value="hu">Hungary</option>
                        <option value="in">India</option>
                        <option value="id">Indonesia</option>
                        <option value="ie">Ireland</option>
                        <option value="il">Israel</option>
                        <option value="it">Italy</option>
                        <option value="jp">Japan</option>
                        <option value="lv">Latvia</option>
                        <option value="lt">Lithuania</option>
                        <option value="my">Malaysia</option>
                        <option value="mx">Mexico</option>
                        <option value="ma">Morocco</option>
                        <option value="nl">Netherlands</option>
                        <option value="nz">New Zealand</option>
                        <option value="nl">Netherlands</option>
                        <option value="ng">Nigeria</option>
                        <option value="no">Norway</option>
                        <option value="ph">Philippines</option>
                        <option value="pl">Poland</option>
                        <option value="pt">Portugal</option>
                        <option value="ro">Romania</option>
                        <option value="ru">Russia</option>
                        <option value="sa">Saudi Arabia</option>
                        <option value="rs">Serbia</option>
                        <option value="sg">Singapore</option>
                        <option value="sk">Slovakia</option>
                        <option value="si">Slovenia</option>
                        <option value="za">South Africa</option>
                        <option value="kr">South Korea</option>
                        <option value="se">Sweden</option>
                        <option value="ch">Switzerland</option>
                        <option value="tw">Taiwan</option>
                        <option value="th">Thailand</option>
                        <option value="tr">Turkey</option>
                        <option value="ae">UAE</option>
                        <option value="ua">Ukraine</option>
                        <option value="gb">United Kingdom</option>
                        <option value="us">United States</option>
                        <option value="ve">Venezuela</option>
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

export default Country;
