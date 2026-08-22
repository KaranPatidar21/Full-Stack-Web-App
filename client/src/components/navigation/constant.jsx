import { pageUrl } from "../../constant";

export const centerMenus = [
    { label: "Search Jobs", path: pageUrl.searchJobs },
    { label: "Categories", path: pageUrl.categories },
    { label: "About", path: pageUrl.about },
];

export const actionButtons = [
    {
        label: "Login",
        path: pageUrl.login,
        variant: "outlined",
    },
    {
        label: "Register",
        path: pageUrl.login,
        state: { mode: "register" },
        variant: "outlined",
    },
    {
        label: "Post a Job",
        path: pageUrl.postJob,
        variant: "contained",
    },
];