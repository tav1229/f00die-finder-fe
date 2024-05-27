// import { Button, buttonVariants } from "@/components/ui/button";
import { AreaChart, Users, Building2, FileBarChart } from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Navigation() {
    const style =
        "flex px-2 h-10 transition-all duration-300 ease-in-out justify-start items-center text-sm hover:bg-gray-100 rounded-md focus:outline-none ";
    return (
        <div className="min-w-60 h-full shadow-2xl md:shadow-none bg-white font-roboto relative rounded-md">
            <div className="space-y-4 py-4 sticky top-[72px]">
                <div className="flex flex-col gap-1 font-medium">
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                            isActive ? `${style} bg-[#F01B23] text-white` : style
                        }
                    >
                        <AreaChart className="mr-2 h-4 w-4" />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to={"/user-management"}
                        className={({ isActive }) => (isActive ? style : style)}
                    >
                        <Users className="mr-2 h-4 w-4" />
                        Quản lý nhà hàng
                    </NavLink>

                    <NavLink
                        to={"/company-management"}
                        className={({ isActive }) => (isActive ? style : style)}
                    >
                        <Building2 className="mr-2 h-4 w-4" />
                        Quản lý người dùng
                    </NavLink>

                    {/* <NavLink
                        to={"/job-management"}
                        className={({ isActive }) => (isActive ? style : style)}
                    >
                        <FileBarChart className="mr-2 h-4 w-4" />
                        Job Management
                    </NavLink> */}
                </div>
            </div>
        </div>
    );
}
