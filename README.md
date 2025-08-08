# Starlink Satelite Tracker

This project is a simple application that tracks Starlink satellites using the N2YO API.

The map is powered by [Leaflet](https://leafletjs.com/), and the application uses [node-fetch](https://www.npmjs.com/package/node-fetch) to make API requests.

## Setup

Get your API key from [N2YO](https://www.n2yo.com/) and set it in the environment variable `N2YO_API_KEY`

```bash
# install
npm install express node-fetch@2
# run proxy
node proxy.js
# run local server for scripts.js
local-server
```

![Starlink Tracker Screenshot](https://github.com/hectorsvill/Live-Satellite-Tracker/blob/main/app.png)
