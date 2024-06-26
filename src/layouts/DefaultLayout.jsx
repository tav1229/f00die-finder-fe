import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom"
export default function DefaultLayout({ children }) {
    return (
        <div className="flex relative flex-col items-center">
            <Header />
            {children}
            <Outlet />
        </div>
    );
}
