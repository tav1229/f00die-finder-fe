import DefaultLayout from "../../layouts/DefaultLayout";
import Restaurant from "../../views/Restaurant";
import Detail from "../../views/Restaurant/Detail";
import Booking from "../../views/Restaurant/Booking";
export default {
    path: "/restaurant",
    element: <DefaultLayout />,
    children: [
        { path: "", element: <Restaurant /> },
        { path: ":id", element: <Detail /> },
        { path: ":id/booking", element: <Booking />}
    ],
};
