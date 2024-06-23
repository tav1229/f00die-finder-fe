import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SearchA from './Search';
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react";

export default function UserLayout({ children }) {
    const location = useLocation();
    const [role, setRole] = useState()

    useEffect(() => {
        setRole(localStorage.getItem('role'))
    }, [])
    return (
        <div className="flex relative flex-col items-center">
            <Header />
            {(location.pathname !== "/" && (role != 1 && role != 0)) && <SearchA />}
            {children}
            <Outlet />
            <Footer />
        </div>
    );
}
