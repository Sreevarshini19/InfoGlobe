// server/controllers/movieController.js
const axios = require('axios');

const getUpcomingMovies = async (req, res) => {
    const headers = {
        'x-apihub-key': 'blVlONmysdN7fU5fRTlXKs2Nn1k8Yot-e1f5IS0CQA0P6GCje-',
        'x-apihub-host': 'Movies-Verse.allthingsdev.co',
        'x-apihub-endpoint': '4f700f4a-4bd2-4604-8d5b-7b5e4c976c65'
    };

    try {
        const response = await axios.get('https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/upcoming-movies', { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
};

module.exports = { getUpcomingMovies };
