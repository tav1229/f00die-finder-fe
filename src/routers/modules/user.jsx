import User from "../../views/User";
import DefaultLayout from "../../layouts/DefaultLayout";
import PasswordChange from "../../views/User/PasswordChange";
import BookingHistory from "../../views/User/BookingHistory";
export default {
    path: "/user",
    element: <DefaultLayout />,
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
    ],
};