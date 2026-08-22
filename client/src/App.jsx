import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import { appRoutes } from "./routes/routes";
import { useDispatch } from "react-redux";
import { getProfile } from "./pages/login/service/authAction";
import { clearUser } from "./pages/login/service/authReducer";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from "./utils/localStorage";

function App() {
  const dispatch = useDispatch();
  const token = getItemFromLocalStorage("ptjob_token");

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token)).then((result) => {
        if (getProfile.fulfilled.match(result)) {
          setItemInLocalStorage("ptjob_user", JSON.stringify(result.payload));
          return;
        }

        dispatch(clearUser());
        removeItemFromLocalStorage("ptjob_token");
        removeItemFromLocalStorage("ptjob_user");
      });
    }
  }, [dispatch, token]);

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