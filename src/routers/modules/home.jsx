import Home from "../../views/Home";
// import DefaultLayout from "../../layouts/DefaultLayout";
import UserLayout from "../../layouts/UserLayout";
import SignUp from "../../views/auth/SignUp";
import SignIn from "../../views/auth/SignIn";
import OwnerSignUp from "../../views/auth/OwnerSignUp";
export default {
    path: "/",
    element: <UserLayout />,
    children: [
        { path: "/", element: <Home /> },
        {
            path: "sign-in",
            element: <SignIn />,
        },
        {
            path: "sign-up",
            element: <SignUp />,
        },
        {
            path: "owner-sign-up",
            element: <OwnerSignUp />,
        },
    ],
};
