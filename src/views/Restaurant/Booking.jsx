import { Search, ListFilter } from "lucide-react";
import AtomDropdown from "@/components/Atoms/AtomDropdown";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DatePicker } from "antd";
import {
    ChevronRight,
    MapPin,
    Flag,
    Clock,
    Baby,
    UserRound,
} from "lucide-react";

export default function Booking() {
    return (
        <section className="w-full flex justify-center h-auto bg-[#EEEEEE]">
            <div className="flex flex-col w-full max-w-[1280px] bg-[#EEEEEE]">
                <div className="w-full flex flex-col py-4 px-7">
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

                <div className="flex flex-col gap-4 px-7 py-5 bg-[#F2F2F7]">
                    <div className="flex w-full uppercase bg-white rounded-lg text-xl font-medium text-[#333333] p-5">
                        {`ĐẶT CHỖ ĐẾN "BUFFET HẢI SẢN & DIMSUM CỬU VÂN LONG - THÁI HÀ"`}
                    </div>
                    <form className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 flex flex-col gap-3 bg-white rounded-lg p-5">
                            <div className="py-2">
                                <h1 className="text-base font-medium">
                                    Thông tin người đặt
                                </h1>
                            </div>
                            <div className="flex flex-col gap-1 py-1">
                                <label
                                    htmlFor="name"
                                    className="text-sm text-[#333333] font-medium"
                                >
                                    Tên liên lạc{" "}
                                    <span className="text-[#d02028]">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="border border-[#CCCCCC] h-[34px] outline-none text-[#555555] text-sm rounded-sm block w-full p-2"
                                    placeholder="Nhập tên liên lạc"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2 py-1">
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="phone"
                                        className="text-sm text-[#333333] font-medium"
                                    >
                                        Số điện thoại{" "}
                                        <span className="text-[#d02028]">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        className="border border-[#CCCCCC] h-[34px] outline-none text-[#555555] text-sm rounded-sm block w-full p-2"
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="email"
                                        className="text-sm text-[#333333] font-medium"
                                    >
                                        Email{" "}
                                        <span className="text-[#d02028]">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="border border-[#CCCCCC] h-[34px] outline-none text-[#555555] text-sm rounded-sm block w-full p-2"
                                        placeholder="Nhập email"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 py-1">
                                <label
                                    htmlFor="note"
                                    className="text-sm text-[#333333] font-medium"
                                >
                                    Ghi chú
                                </label>
                                <textarea
                                    id="note"
                                    rows={2}
                                    className="border border-[#CCCCCC] outline-none text-[#555555] text-sm rounded-sm block w-full p-2"
                                    placeholder="Nhập ghi chú"
                                />
                            </div>
                            <button className="h-10 flex items-center justify-center w-[200px] text-lg bg-[#d02028] text-white font-medium rounded-md">
                                Tiếp tục
                            </button>
                            <span className="text-sm text-[#808080] font-medium mb-4">
                                Khi lựa chọn “Tiếp tục” bạn đã công nhận mình đã
                                đọc và đồng ý với các Điều khoản sử dụng và
                                chính sách quyền riêng tư của Pasgo
                            </span>
                        </div>

                        <div className="col-span-1 bg-white rounded-lg h-fit">
                            <div className="flex flex-col p-4">
                                <div className="flex items-center justify-around py-2 border-b">
                                    <h2 className="text-base font-medium pr-8">
                                        Thông tin đặt chỗ
                                    </h2>
                                    <button
                                        className="h-9 flex items-center justify-center text-sm px-3 bg-[#d02028] text-white font-medium rounded-md"
                                        type="button"
                                    >
                                        Chỉnh sửa
                                    </button>
                                </div>
                                <div className="px-4 py-5 gap-5 flex flex-col">
                                    <span className="text-sm pb-5 font-medium border-b">
                                        Buffet Hải Sản & Dimsum Cửu Vân Long -
                                        Thái Hà
                                    </span>
                                    <span className="text-sm pb-5 font-medium border-b">
                                        2 người lớn, 0 trẻ em
                                    </span>
                                    <span className="text-sm pb-5 font-medium border-b">
                                        Thứ bảy, ngày 25/05/2024 18:15
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
