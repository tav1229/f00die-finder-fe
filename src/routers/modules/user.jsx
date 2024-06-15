import User from "../../views/User";
// import DefaultLayout from "../../layouts/DefaultLayout";
import UserLayout from "../../layouts/UserLayout";
import PasswordChange from "../../views/User/PasswordChange";
import BookingHistory from "../../views/User/BookingHistory";
import RestaurantSaved from "../../views/User/RestaurantSaved";
export default {
    path: "/user",
    element: <UserLayout />,
    children: [
        {
            path: "",
            element: <User />,
        },
        {
            path: "password-management",
            element: <PasswordChange />,
        },
        {
            path: "booking-history",
            element: <BookingHistory />,
        },
        {
            path: "restaurant-saved",
            element: <RestaurantSaved />,
        },
    ],
};
