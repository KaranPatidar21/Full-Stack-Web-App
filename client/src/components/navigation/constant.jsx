import { pageUrl } from "../../constant";

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
        employerOnly: true,
    },
    {
        label: "My Posted Jobs",
        path: pageUrl.myPostedJob,
        variant: "outlined",
        employerOnly: true,
    },
];