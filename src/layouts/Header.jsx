import { NavLink, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { FaBell, FaUser } from "react-icons/fa";
import { RiUserSettingsLine } from "react-icons/ri";
import { Popover } from "antd";
import { Heart, BriefcaseBusiness } from "lucide-react";
import { MdOutlineWorkHistory } from "react-icons/md";
import Logo from "../assets/images/logo.png";
import { checkExpiration } from "../utils/checkExpiration";
import { useEffect, useState } from "react";
import { useAuthStore } from "../storages/auth";

const PopoverAccount = ({ onLogout, isExpired, isRole }) => (
    <div className="flex flex-col">
        {!isExpired ? (
            <>
                <NavLink
                    to="/user"
                    className={({ isActive }) =>
                        isActive
                            ? `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 text-[#FFC522]`
                            : `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 hover:text-[#FFC522] `
                    }
                >
                    <RiUserSettingsLine className="w-5 h-5" /> Thông tin tài
                    khoản
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
                {isRole === 2 && (
                    <>
                        <NavLink
                            to="/user/booking-history"
                            className={({ isActive }) =>
                                isActive
                                    ? `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 text-[#FFC522]`
                                    : `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 hover:text-[#FFC522] `
                            }
                        >
                            <MdOutlineWorkHistory className="w-5 h-5" /> Lịch sử
                            đặt chỗ
                        </NavLink>
                        <NavLink
                            to="/user/restaurant-saved"
                            className={({ isActive }) =>
                                isActive
                                    ? `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 text-[#FFC522]`
                                    : `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 hover:text-[#FFC522] `
                            }
                        >
                            <Heart className="w-5 h-5" /> Nhà hàng yêu thích
                        </NavLink>
                    </>
                )}
                <div className="w-full border-t"></div>
                <div
                    className="flex gap-2 items-center py-2 px-3 cursor-pointer rounded-md transition-all duration-300 text-red-600"
                    onClick={onLogout}
                >
                    <MdLogout className="w-5 h-5" /> Đăng xuất
                </div>
            </>
        ) : (
            <>
                <NavLink
                    to="/sign-in"
                    className={({ isActive }) =>
                        isActive
                            ? `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 text-[#FFC522]`
                            : `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 hover:text-[#FFC522] `
                    }
                >
                    Đăng nhập
                </NavLink>
                <NavLink
                    to="/sign-up"
                    className={({ isActive }) =>
                        isActive
                            ? `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 text-[#FFC522]`
                            : `flex gap-2 items-center py-2 px-3 rounded-md transition-all duration-300 hover:bg-slate-200 hover:text-[#FFC522] `
                    }
                >
                    Đăng ký
                </NavLink>
            </>
        )}
    </div>
);

export default function Header() {
    const navigate = useNavigate();
    const { isExpired, setIsExpired } = useAuthStore();
    const [isRole, setIsRole] = useState(null);

    useEffect(() => {
        const isExpired = checkExpiration();
        setIsExpired(isExpired);
        const role = localStorage.getItem("role");
        if (role) {
            setIsRole(parseInt(role));
        } else {
            setIsRole(2);
        }
    }, [isExpired]);
    const handleLogout = () => {
        localStorage.removeItem("access-token");
        localStorage.removeItem("accessTokenExpiryTime");
        localStorage.removeItem("refresh-token");
        localStorage.removeItem("refreshTokenExpiryTime");
        localStorage.removeItem("role");
        setIsExpired(true);
        navigate("/sign-in");
    };

    return (
        <header className="flex sticky top-0 z-10 justify-between items-center bg-[#D02028] w-full h-10 px-8">
            <div className="flex gap-10">
                <NavLink
                    to={isRole === 0 && !checkExpiration() ? "/admin" : isRole === 1 && checkExpiration() ? "/owner" : "/"}
                    className="flex items-center"
                >
                    <img src={Logo} alt="logo" className="w-32" />
                </NavLink>
            </div>
            <div className="flex justify-center items-center gap-5">
                {isRole === 2 && (
                    <NavLink
                        to="/owner-sign-up"
                        className="text-white text-xs uppercase font-medium  transition-colors hover:text-white cursor-pointer"
                    >
                        Chủ nhà hàng?
                    </NavLink>
                )}
                <div className="flex justify-center items-center gap-3">
                    <button className="bg-[#FFC522] text-white w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#FFC522]">
                        <FaBell />
                    </button>

                    <Popover
                        content={
                            <PopoverAccount
                                onLogout={handleLogout}
                                isExpired={isExpired}
                                isRole={isRole}
                            />
                        }
                    >
                        <button className="bg-[#FFC522] text-white w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#FFC522]">
                            <FaUser />
                        </button>
                    </Popover>
                </div>
            </div>
        </header>
    );
}
