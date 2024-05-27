import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import UserNavigation from "./UserNavigation";
import BookingHistoryCard from "../../components/BookingHistoryCard";
import { useState } from "react";
export default function BookingHistory() {
    const [activeTab, setActiveTab] = useState("pending");
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
                    <div className="col-span-2 flex flex-col gap-3">
                        <nav className="flex flex-row gap-6 h-14 bg-white text-sm font-medium py-1 px-2">
                            <button
                                className={`flex justify-center items-center px-1 ${
                                    activeTab === "pending"
                                        ? "border-b-2 border-[#d02028]"
                                        : ""
                                } `}
                                onClick={() => setActiveTab("pending")}
                            >
                                Chờ xác nhận
                            </button>
                            <button
                                className={`flex justify-center items-center px-1 ${
                                    activeTab === "accepted"
                                        ? "border-b-2 border-[#d02028]"
                                        : ""
                                } `}
                                onClick={() => setActiveTab("accepted")}
                            >
                                Đã tiếp nhận
                            </button>
                            <button
                                className={`flex justify-center items-center px-1 ${
                                    activeTab === "completed"
                                        ? "border-b-2 border-[#d02028]"
                                        : ""
                                } `}
                                onClick={() => setActiveTab("completed")}
                            >
                                Hoàn thành
                            </button>
                            <button
                                className={`flex justify-center items-center px-1 ${
                                    activeTab === "cancelled"
                                        ? "border-b-2 border-[#d02028]"
                                        : ""
                                } `}
                                onClick={() => setActiveTab("cancelled")}
                            >
                                Đã hủy
                            </button>
                            <button
                                className={`flex justify-center items-center px-1 ${
                                    activeTab === "all"
                                        ? "border-b-2 border-[#d02028]"
                                        : ""
                                } `}
                                onClick={() => setActiveTab("all")}
                            >
                                Tất cả
                            </button>
                        </nav>
                        <BookingHistoryCard status={activeTab} />
                        <BookingHistoryCard status={activeTab} />
                        <BookingHistoryCard status={activeTab} />
                    </div>
                </div>
            </div>
        </section>
    );
}
