import { loginPageUrl, registerPageUrl } from "../constant";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";


export const appRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: loginPageUrl,
    component: Login,
  },
  {
    path: registerPageUrl,
    component: Register,
  },
];