import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WeatherHeader } from "./components/WeatherHeader";
import { HomePage } from "./pages/HomePage";
import { WeatherDetailPage } from "./pages/WeatherDetailPage";
import { I18nProvider } from "./contexts/I18nContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <I18nProvider>
          <WeatherHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/weather/:date" element={<WeatherDetailPage />} />
          </Routes>
        </I18nProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
