# Weather App

A modern, responsive weather application built with React, TypeScript, and Vite that displays current weather information using geolocation.

## Features

- **Current Weather Display**: Shows temperature, weather conditions, and location
- **Geolocation Support**: Automatically detects user's location using browser geolocation API
- **Weather Details**: Displays humidity, wind speed, pressure, and visibility
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful gradient background with glassmorphism effects
- **Real-time Data**: Fetches weather data from OpenWeatherMap API

## Technologies Used

- React 19
- TypeScript
- Vite
- TanStack Query (React Query)
- Axios
- OpenWeatherMap API

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add your OpenWeatherMap API key:

   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

   To get an API key:

   - Sign up at [OpenWeatherMap](https://openweathermap.org/)
   - Go to your account and generate an API key
   - The free tier allows 1000 calls per day

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Usage

- The app will automatically request location permission and display weather for your current location
- Click "Refresh Weather" to update the weather data
- The app shows:
  - Current temperature and "feels like" temperature
  - Weather condition with icon
  - City name and country
  - Humidity, wind speed, pressure, and visibility
  - Loading states and error handling

## Browser Compatibility

The app requires a modern browser with support for:

- Geolocation API
- ES6+ features
- CSS Grid and Flexbox

## API Endpoints Used

- OpenWeatherMap Current Weather API
- Coordinates-based weather fetching
- City-based weather fetching

## Project Structure

```
src/
├── components/
│   └── WeatherDisplay.tsx    # Main weather display component
├── contexts/
│   ├── WeatherContext.tsx    # Weather context provider
│   └── WeatherContextInstance.ts  # Context type definitions
├── hooks/
│   └── useWeather.ts         # Custom hook for weather context
├── services/
│   └── weatherApi.ts         # API service for weather data
├── styles/
│   └── WeatherDisplay.css    # Component styles
├── utils/
│   └── weatherUtils.ts       # Weather utility functions
└── main.tsx                  # App entry point
```

## Development

- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Lint code**: `npm run lint`

## License

MIT License
