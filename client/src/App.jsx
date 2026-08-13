import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import { appRoutes } from "./routes/routes";

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        {appRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;