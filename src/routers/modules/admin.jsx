import DefaultLayout from "../../layouts/DefaultLayout";
import Admin from "../../views/Admin";
import RestaurantManagement from "../../views/Admin/RestaurantManagement";
import UserManagement from "../../views/Admin/UserManagement";

export default {
    path: "/admin",
    element: <DefaultLayout />,
    children: [
        { path: "", element: <Admin /> },
        { path: "dashboard", element: <Admin /> },
        { path: "restaurant-management", element: <RestaurantManagement /> },
        { path: "user-management", element: <UserManagement /> },
    ],
};
