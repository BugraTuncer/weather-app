import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { WeatherHeader } from "./components/WeatherHeader";
import { HomePage } from "./pages/HomePage";
import { WeatherDetailPage } from "./pages/WeatherDetailPage";
import { useThemeEffect } from "./hooks/useThemeEffect";

function AppContent() {
  useThemeEffect();

  return (
    <Router>
      <WeatherHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather/:date" element={<WeatherDetailPage />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;
