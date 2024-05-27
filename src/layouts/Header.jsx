import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineWork, MdLogout } from "react-icons/md";
import { FaBuilding, FaHeart, FaBell, FaUser } from "react-icons/fa";
import { RiUserSettingsLine } from "react-icons/ri";
import { Button, Popover } from "antd";
import { Heart, BriefcaseBusiness } from "lucide-react";
import Logo from "../assets/images/logo.png";
import styles from "./Header.module.css";


const PopoverAccount = ({ onLogout }) => (
    <div className="flex flex-col">
        <NavLink
            to="/user"
            className={({ isActive }) =>
                isActive
                    ? `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 text-[#FFC522]`
                    : `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 hover:text-[#FFC522] `
            }
        >
            <RiUserSettingsLine className="w-5 h-5" /> Thông tin tài khoản
        </NavLink>
        <div className="w-full border-t"></div>
        <NavLink
            to="/user/password-management"
            className={({ isActive }) =>
                isActive
                    ? `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 text-[#FFC522]`
                    : `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 hover:text-[#FFC522] `
            }
        >
            <BriefcaseBusiness className="w-5 h-5" /> Quản lý mật khẩu
        </NavLink>
        <NavLink
            to="/user/booking-history"
            className={({ isActive }) =>
                isActive
                    ? `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 text-[#FFC522]`
                    : `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 hover:text-[#FFC522] `
            }
        >
            <Heart className="w-5 h-5" /> Lịch sử đặt chỗ
        </NavLink>
        <div className="w-full border-t"></div>
        <div
            className="flex gap-2 items-center py-2 px-3 cursor-pointer rounded-md transition-all duration-300 text-red-600"
            onClick={onLogout}
        >
            <MdLogout className="w-5 h-5" /> Đăng xuất
        </div>
    </div>
);

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access-token");
        navigate("/sign-in");
    };

    return (
        <header className="flex sticky top-0 z-10 justify-between items-center bg-[#D02028] w-full h-14 px-6">
            <div className="flex gap-10">
                <NavLink to="/" className="flex items-center">
                    <img src={Logo} alt="logo" className="w-40" />
                </NavLink>
            </div>
            <div className="flex justify-center items-center gap-5">
                <NavLink
                    to="/owner-sign-up"
                    className="text-white text-sm uppercase font-medium  transition-colors hover:text-white cursor-pointer"
                >
                    Chủ nhà hàng?
                </NavLink>
                <div className="flex justify-center items-center gap-3">
                    <button className="bg-[#FFC522] text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#FFC522]">
                        <FaBell />
                    </button>
                    <Popover
                        content={<PopoverAccount onLogout={handleLogout} />}
                    >
                        <button className="bg-[#FFC522] text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#FFC522]">
                            <FaUser />
                        </button>
                    </Popover>
                </div>
            </div>
        </header>
    );
}
