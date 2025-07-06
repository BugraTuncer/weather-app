import "./App.css";
import { WeatherHeader } from "./components/WeatherHeader";
import { HomePage } from "./pages/HomePage";
import { I18nProvider } from "./contexts/I18nContext";

function App() {
  return (
    <I18nProvider>
      <WeatherHeader />
      <HomePage />
    </I18nProvider>
  );
}

export default App;
