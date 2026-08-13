import { aboutPageUrl, categoriesPageUrl, loginPageUrl, postJobPageUrl, registerPageUrl, searchJobsPageUrl } from "../../constant";

export const centerMenus = [
    { label: "Search Jobs", path: searchJobsPageUrl },
    { label: "Categories", path: categoriesPageUrl },
    { label: "About", path: aboutPageUrl },
];

export const actionButtons = [
    {
        label: "Login",
        path: loginPageUrl,
        variant: "outlined",
    },
    {
        label: "Register",
        path: registerPageUrl,
        variant: "outlined",
    },
    {
        label: "Post a Job",
        path: postJobPageUrl,
        variant: "contained",
    },
];