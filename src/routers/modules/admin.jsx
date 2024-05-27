import DefaultLayout from "../../layouts/DefaultLayout";
import Admin from "../../views/Admin";

export default {
    path: "/admin",
    element: <DefaultLayout />,
    children: [
        { path: "", element: <Admin /> },
        { path: "dashboard", element: <Admin /> },
    ],
};
