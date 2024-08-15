const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

const NEWS_API_KEY1 = 'deec8af68e5745a698336d24fa7f05d1';
const NEWS_API_KEY2='f7226cdb3dba461895cf2edf75baeda5d9add9f776f766e90d19a4118d3c1501';
const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
function getPreviousDateFormatted(date = new Date()) {
    const previousDate = new Date(date);
    previousDate.setDate(date.getDate() - 1);

    const year = previousDate.getFullYear();
    const month = String(previousDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(previousDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
// function getFormattedDate(date = new Date()) {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//     const day = String(date.getDate()).padStart(2, '0');

//     return `${year}-${month}-${day}`;
// }
// const today = getFormattedDate();
const prevDate=getPreviousDateFormatted();
app.get('/api/headlines', async (req, res) => {
    const {  country } = req.query;
   
    const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
    const url = `${NEWS_API_URL}?country=${country || 'us'}&sortBy=popularity&from=${prevDate}&to=${today}&apiKey=${NEWS_API_KEY1}`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch headlines' });
    }
});

app.get('/api/newspaper', async (req, res) => {
    // https://serpapi.com/search?engine=google_news&q=site:indianexpress.com

    console.log("hello");
    const {type} = req.query;
    const typeurl={
        "Indian Express":"indianexpress.com",
        "The Times of India":"timesofindia.indiatimes.com",
        "The New York Times":"nytimes.com",
        "The Economic Times":"economictimes.indiatimes.com"
    }
    const NEWS_API_URL = 'https://serpapi.com/search?engine=google_news&q=site:';
    const url = `${NEWS_API_URL}${typeurl[type]}?&freshness=${today}&api_key=${NEWS_API_KEY2}`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch headlines' });
    }
});
app.get('/api/news/topic',async(req,res)=>{

    // https://newsapi.org/v2/top-headlines?category=sports&apiKey=deec8af68e5745a698336d24fa7f05d1

    const {topic, language, country } = req.query;
    const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
    const topicurl={
        "Sports":"sports",
        "Politics":"politics",
        "Entertainment":"entertainment",
        "Technology":"technology",
        "Health":"health"
    }
    console.log(topicurl[topic]);
    const url = `${NEWS_API_URL}?category=${topicurl[topic]}&country=${country || 'us'}&sortBy=popularity&from=${prevDate}&to=${today}&apiKey=${NEWS_API_KEY1}`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch headlines' });
    }

});
app.get('/api/country', async (req, res) => {
    console.log("hello");
    const {  country } = req.query;
    // https://newsapi.org/v2/top-headlines?country=us&sortBy=popularity&from=2024-07-30&to=2024-07-31&apiKey=deec8af68e5745a698336d24fa7f05d1
    const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
    const url = `${NEWS_API_URL}?country=${country || 'us'}&sortBy=popularity&from=${prevDate}&to=${today}&apiKey=${NEWS_API_KEY1}`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch country headlines' });
    }
});
app.get('/api/question',async(req,res)=>{
    const {query}=req.query;
    console.log("back");
    try {
       const NEWS_API_URL=`https://newsapi.org/v2/everything`;
      
        const url = `${NEWS_API_URL}?sortBy=popularity&q=${query}&apiKey=${NEWS_API_KEY1}`;
        console.log("hello");
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch question ' });
    }
});
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
