import { NavLink } from "react-router-dom";

export default function Navigation() {
    const baseStyle =
        "flex items-center justify-start w-full h-12 px-3 rounded-md transition-all duration-300 font-medium text-sm bg-[#F01B23] text-white hover:bg-[white] hover:text-[#d02028]";
    const activeStyle =
        "flex items-center justify-start w-full h-12 rounded-md px-3 font-medium text-sm bg-[white] text-[#d02028]";
    return (
        <nav className="flex flex-col rounded-md overflow-hidden gap-[1px] h-full p-4 bg-[#F01B23]">
            <NavLink
                end
                to="/owner/dashboard"
                className={({ isActive }) =>
                    isActive ? activeStyle : baseStyle
                }
            >
                Dashboard
            </NavLink>
            <NavLink
                to="/owner/booking-management"
                className={({ isActive }) =>
                    isActive ? activeStyle : baseStyle
                }
            >
                Quản lý đặt bàn
            </NavLink>
            <NavLink to="/owner/restaurant"
                className={({ isActive }) =>
                    isActive ? activeStyle : baseStyle
                }
            >
                Thông tin nhà hàng
            </NavLink>
        </nav>
    );
}
