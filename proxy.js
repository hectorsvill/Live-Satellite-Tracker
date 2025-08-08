const express = require('express');
const fetch = require('node-fetch');
const app = express();

const API_KEY = process.env.N2YO_API_KEY;

if (!API_KEY) {
    console.error("FATAL ERROR: N2YO_API_KEY environment variable not set.");
    process.exit(1);
}

const OBSERVER_LAT = 40.7128;
const OBSERVER_LNG = -74.0060;
const OBSERVER_ALT = 0;
const SATELLITE_CATEGORY_ID = 52;

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/satellites', async (req, res) => {
    const url = `https://api.n2yo.com/rest/v1/satellite/above/${OBSERVER_LAT}/${OBSERVER_LNG}/${OBSERVER_ALT}/70/${SATELLITE_CATEGORY_ID}?apiKey=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('N2YO API error:', response.status, errorText);
            return res.status(response.status).json({ error: `N2YO API Error: ${response.status} ${errorText}` });
        }
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/spaceStation', async (req, res) => {
    const url = `https://api.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/2?apiKey=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('N2YO API error:', response.status, errorText);
            return res.status(response.status).json({ error: `N2YO API Error: ${response.status} ${errorText}` });
        }
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));