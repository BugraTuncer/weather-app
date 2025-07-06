import "./App.css";
import { WeatherHeader } from "./components/WeatherHeader";
import { HomePage } from "./pages/HomePage";
import { I18nProvider } from "./contexts/I18nContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <WeatherHeader />
        <HomePage />
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
