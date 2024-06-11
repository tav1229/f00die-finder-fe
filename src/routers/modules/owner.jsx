import Owner from "../../views/Owner";
import DefaultLayout from "../../layouts/DefaultLayout";
import BookingManagement from "../../views/Owner/BookingManagement";
import RestaurantInfo from "../../views/Owner/RestaurantInfo";
export default {
    path: "/owner",
    element: <DefaultLayout />,
    children: [
        {
            path: "",
            element: <Owner />,
        },
        {
            path: "dashboard",
            element: <Owner />,
        },
        {
            path: "booking-management",
            element: <BookingManagement />,
        },
        {
            path: "restaurant",
            element: <RestaurantInfo />,
        },
    ],
};
