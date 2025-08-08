"use strict";

// --- CONFIGURATION ---
const OBSERVER_LAT = 40.7128;
const OBSERVER_LNG = -74.0060;
const OBSERVER_ALT = 0;
const SATELLITE_CATEGORY_ID = 52;
const INITIAL_ZOOM_LEVEL = 5;
const API_URL = "http://localhost:3000/satellites";
// const API_URL = "http://localhost:3000/spaceStation";

// --- MAP INITIALIZATION ---
const map = L.map('map').setView([OBSERVER_LAT, OBSERVER_LNG], INITIAL_ZOOM_LEVEL);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// --- SATELLITE TRACKING LOGIC ---
async function getAndPlotSatellites() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API request failed with status: ${response.status} - ${errorData.error}`);
        }
        const data = await response.json();
        console.log("Satellites data:", data);
        updateSatelliteMarkers(data.above);
    } catch (error) {
        console.error("Failed to fetch satellite data:", error);
        alert(`Failed to fetch satellite data: ${error.message}`);
    }
}

function calculateSatellitePosition(sat, time) {
    // Placeholder: Replace with actual satellite.js calculation
    return { lat: sat.satlat, lng: sat.satlng };
}

function updateSatelliteMarkers(satellites) {
    // Clear existing markers
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add new markers
    satellites?.forEach(sat => {
        const { lat, lng } = calculateSatellitePosition(sat, new Date());
        L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`<b>${sat.satname}</b><br>Altitude: ${sat.satalt} km`)
            .openPopup();
    });
}

// --- INITIALIZE ---
getAndPlotSatellites();