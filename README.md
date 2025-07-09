# Weather App

A simple weather application built with React and TypeScript. It allows users to search for city weather, view 7-day forecasts, and save favorite locations. The app supports multiple languages (English & Spanish).

## Features

- Search weather by city name
- View current weather details (temperature, humidity, wind, etc.)
- 7-day weather forecast
- Save and manage favorite weather locations
- Multi-language support (English & Spanish)
- Responsive and user-friendly interface
- Animation

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- Yarn or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

### Running the App

Start the development server:

```bash
yarn dev
# or
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### Building for Production

```bash
yarn build
# or
npm run build
```

### Linting

```bash
yarn lint
# or
npm run lint
```

## Project Structure

```
src/
  components/      # Reusable UI components
  containers/      # Main feature containers
  hooks/           # Custom React hooks
  i18n/            # Localization files
  models/          # TypeScript models
  pages/           # Page components
  services/        # API and data services
  store/           # Redux store and slices
  styles/          # CSS files
  utils/           # Utility functions
```

## Localization

- English and Spanish translations are available.
- You can add more languages by extending the files in `src/i18n/locales/`.
