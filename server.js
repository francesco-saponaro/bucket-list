import express from 'express';
import axios from 'axios';
import cors from 'cors';
const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes

// SerpApi Google Search API URL and parameters
app.get('/search', async (req, res) => {
    const { q } = req.query;
    try {
        const response = await axios.get('https://serpapi.com/search.json', {
            params: {
                q,
                engine: 'google',
                api_key: process.env.VITE_APP_API_URL,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching from SerpApi:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});
