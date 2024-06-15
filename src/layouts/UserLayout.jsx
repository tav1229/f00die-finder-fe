import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SearchA from './Search';
import { Outlet } from "react-router-dom"

export default function UserLayout({ children }) {
    const location = useLocation();
    return (
        <div className="flex relative flex-col items-center">
            <Header />
            {location.pathname !== "/" && <SearchA />}
            {children}
            <Outlet />
            <Footer />
        </div>
    );
}
