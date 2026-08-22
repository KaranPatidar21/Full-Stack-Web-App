import { pageUrl } from "../constant";
import Home from "../pages/home";
import Login from "../pages/login";


export const appRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: pageUrl.login,
    component: Login,
  },
];