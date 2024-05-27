import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import UserNavigation from "./UserNavigation";

export default function User() {
    return (
        <section className="w-full flex flex-col items-center justify-start h-auto min-h-screen bg-[#EEEEEE]">
            <div className="w-full flex flex-col py-4 px-7 bg-[#F7F6F4]">
                <div className="search  flex justify-center items-center w-3/4 gap-4">
                    <input
                        type="text"
                        id="default-input"
                        className="bg-gray-50 border border-[#CCCCCC] h-[34px] outline-none text-gray-700 font-medium text-sm rounded-md block w-full p-2"
                        placeholder="Buffet, quán ăn, địa điểm..."
                    />
                    <button className="flex justify-center items-center gap-2 rounded-md h-[34px] flex-shrink-0 py-2 px-5 bg-[#D02028] text-white font-medium">
                        <Search className="w-5 h-5" />
                        <p>Tìm kiếm</p>
                    </button>
                </div>
            </div>

            <div className="w-full max-w-[1280px] flex flex-col px-12">
                <div className="text-sm flex gap-1 w-full items-center h-16 px-2">
                    <Link
                        to="/"
                        className="text-[#333333] font-medium hover:text-[#D02028]"
                    >
                        Trang chủ
                    </Link>{" "}
                    {">"}{" "}
                    <p className="font-bold text-[#D02028]">
                        Thông tin tài khoản
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <UserNavigation />
                    <div className="col-span-2 flex flex-col bg-white p-6">
                        <h1 className="text-xl font-medium uppercase text-center mb-6">
                            Thông tin tài khoản
                        </h1>
                        <form action="" className="flex flex-col gap-2">
                            <div className="flex items-center">
                                <label
                                    htmlFor="name"
                                    className="min-w-[110px] font-medium text-sm"
                                >
                                    Tên:
                                </label>
                                <input
                                    placeholder="Họ và tên"
                                    type="text"
                                    className="border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-5 max-w-[340px]"
                                />
                            </div>
                            <div className="flex items-center">
                                <label
                                    htmlFor="email"
                                    className="min-w-[110px] font-medium text-sm"
                                >
                                    Email:
                                </label>
                                <input
                                    placeholder="Email"
                                    type="text"
                                    className="border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-5 max-w-[340px]"
                                />
                            </div>
                            <div className="flex items-center">
                                <label
                                    htmlFor="phone"
                                    className="min-w-[110px] font-medium text-sm"
                                >
                                    Số điện thoại:
                                </label>
                                <input
                                    placeholder="Số điện thoại"
                                    type="text"
                                    className="border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-5 max-w-[340px]"
                                />
                            </div>

                            <div className="w-full mt-2 flex justify-center">
                                <button
                                    type="button"
                                    className="bg-[#D02028] text-white font-medium h-10 w-40 rounded-md text-sm "
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
