import "./styles/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { WeatherHeader } from "./components/WeatherHeader";
import { HomePage } from "./pages/HomePage";
import { WeatherDetailPage } from "./pages/WeatherDetailPage";
import { useThemeEffect } from "./hooks/useThemeEffect";

function AppContent() {
  useThemeEffect();
  const location = useLocation();

  const showHeader = !location.pathname.startsWith("/weather/");

  return (
    <>
      {showHeader && <WeatherHeader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather/:date" element={<WeatherDetailPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppContent />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
