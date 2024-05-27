import { NavLink } from 'react-router-dom';
import { FaUser, FaBriefcase   } from "react-icons/fa6";
import { FaChevronRight, FaCalendarAlt  } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
export default function UserNavigation () {
    return (
        <nav className="w-[377px] flex flex-col bg-white">
            <NavLink
                to="/user"
                className="w-full flex justify-between items-center h-12 text-sm font-medium pl-4 pr-2 border-b hover:text-[#D02028]"
                activeClassName="border-[#D02028] text-[#D02028]"
            >
                <div className="flex gap-2 items-center"><FaUser />Thông tin tài khoản</div>
                <FaChevronRight />
            </NavLink>
            <NavLink
                to="/user/password-management"
                className="w-full flex justify-between items-center h-12 text-sm font-medium pl-4 pr-2 border-b hover:text-[#D02028]"
                activeClassName="border-[#D02028] text-[#D02028]"
            >
                <div className="flex gap-2 items-center"><FaBriefcase />Quản lý mật khẩu</div>
                <FaChevronRight />
            </NavLink>
            <NavLink
                to="/user/booking-history"
                className="w-full flex justify-between items-center h-12 text-sm font-medium pl-4 pr-2 border-b hover:text-[#D02028]"
                activeClassName="border-[#D02028] text-[#D02028]"
            >
                <div className="flex gap-2 items-center"><FaCalendarAlt />Lịch sử đơn Đặt chỗ</div>
                <FaChevronRight />
            </NavLink>
            <NavLink
                to="/sign-in"
                className="w-full flex justify-between items-center h-12 text-sm font-medium pl-4 pr-2 border-b hover:text-[#D02028]"
            >
                <div className="flex gap-2 items-center"><IoExit className="w-5 h-5"/>Thoát</div>
                <FaChevronRight />
            </NavLink>
        </nav>
    )
}