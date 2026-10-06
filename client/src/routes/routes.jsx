import { pageUrl } from "../constant";
import Home from "../pages/home";
import Login from "../pages/login";
import PostJob from "../pages/postJob";
import MyPostedJob from "../pages/myPostedJob";


export const appRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: pageUrl.login,
    component: Login,
  },
  {
    path: pageUrl.postJob,
    component: PostJob,
  },
  {
    path: pageUrl.myPostedJob,
    component: MyPostedJob,
  },
];