# Weather App

A modern React weather dashboard with advanced features powered by OpenWeatherMap.

## Advanced Features

- City search with instant updates
- Unit toggle between Celsius and Fahrenheit
- Current location support using browser geolocation
- 5-day forecast cards
- 8-hour hourly outlook
- Search history saved in local storage
- Detailed weather metrics: humidity, pressure, wind, sunrise, sunset, feels like
- Responsive dark-themed layout

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with your OpenWeather API key:

```bash
REACT_APP_API_KEY=your_openweathermap_api_key
```

3. Start the app:

```bash
npm start
```

4. Open the app in your browser at:

```text
http://localhost:3000
```

## Notes

- If you run into OpenSSL compatibility issues on newer Node versions, use `--openssl-legacy-provider` or switch to Node 18/20.
- Search history is stored locally in your browser so your last five cities are easy to revisit.

## Available Scripts

In the project directory, you can run:

### `npm start`

Start the app in development mode.

### `npm run build`

Build the app for production.

### `npm test`

Launch the test runner.
