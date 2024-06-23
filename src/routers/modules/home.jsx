import Home from "../../views/Home";
// import DefaultLayout from "../../layouts/DefaultLayout";
import UserLayout from "../../layouts/UserLayout";
import SignUp from "../../views/auth/SignUp";
import SignIn from "../../views/auth/SignIn";
import OwnerSignUp from "../../views/auth/OwnerSignUp";
import Admin from "../../views/Admin";
import Owner from "../../views/Owner";
import { redirect } from 'react-router-dom'

const roleLoader = async () => {
    const role = localStorage.getItem("role");

    if (role == 0) {
        return redirect("/admin");
    } else if (role == 1) {
        return redirect("/owner");
    }
    return null;
};

export default {
    path: "/",
    element: <UserLayout />,
    children: [
        { path: "/", element: <Home />, loader: roleLoader },
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