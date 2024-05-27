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
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";

const contentStyle = {
    margin: 0,
    height: "772px",
    color: "#fff",
    // lineHeight: '160px',
    textAlign: "center",
    background: "#364d79",
    borderRadius: "10px",
};

export default function Detail() {
    const navigate = useNavigate();
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
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

                <div className="w-full flex flex-col justify-center items-center ">
                    <div className="w-full max-w-[1208px] flex flex-col gap-5">
                        <div className="grid grid-cols-3 gap-4 ">
                            <div className="col-span-2 rounded-lg overflow-hidden">
                                <Carousel autoplay arrows>
                                    <img
                                        src="https://pasgo.vn/Upload/anh-chi-tiet/slide-red-bean-8-normal-2263206357802.webp"
                                        alt=""
                                        className="w-full h-[364px] object-cover rounded-lg"
                                    />
                                    <img
                                        src="https://pasgo.vn/Upload/anh-chi-tiet/slide-red-bean-7-normal-2263206457803.webp"
                                        alt=""
                                        className="w-full h-[364px] object-cover rounded-lg"
                                    />
                                    <img
                                        src="https://pasgo.vn/Upload/anh-chi-tiet/slide-red-bean-6-normal-2263206557804.webp"
                                        alt=""
                                        className="w-full h-[364px] object-cover rounded-lg"
                                    />
                                </Carousel>
                            </div>
                            <div>
                                <div className="grid grid-cols-2 gap-2 h-auto">
                                    <img
                                        src="https://pasgo.vn/Upload/anh-chi-tiet/slide-red-bean-8-normal-2263206357802.webp"
                                        alt=""
                                        className="w-full h-[115px] object-cover rounded-sm"
                                    />
                                    <img
                                        src="https://pasgo.vn/Upload/anh-chi-tiet/slide-red-bean-8-normal-2263206357802.webp"
                                        alt=""
                                        className="w-full h-[115px] object-cover rounded-sm"
                                    />
                                    <img
                                        src="https://pasgo.vn/Upload/anh-chi-tiet/slide-red-bean-8-normal-2263206357802.webp"
                                        alt=""
                                        className="w-full h-[115px] object-cover rounded-sm"
                                    />
                                    <img
                                        src="https://pasgo.vn/Upload/anh-chi-tiet/slide-red-bean-8-normal-2263206357802.webp"
                                        alt=""
                                        className="w-full h-[115px] object-cover rounded-sm"
                                    />
                                    <img
                                        src="https://pasgo.vn/Upload/anh-chi-tiet/slide-red-bean-7-300-2263206457803.webp"
                                        alt=""
                                        className="w-full h-[115px] object-cover rounded-sm"
                                    />
                                    <img
                                        src="https://pasgo.vn/Upload/anh-chi-tiet/slide-red-bean-8-normal-2263206357802.webp"
                                        alt=""
                                        className="w-full h-[115px] object-cover rounded-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 ">
                            <div className="col-span-2 px-4 py-2 bg-white flex flex-col gap-2 rounded-md">
                                <h1 className="py-1 text-[28px] font-bold">
                                    Red Bean Central Restaurant - Hàng Thùng
                                </h1>
                                <div className="flex items-center gap-3 text-gray-800">
                                    <MapPin className="w-5 h-5" />
                                    <span className="font-medium">
                                        21 Hàng Thùng, P. Lý Thái Tổ, Q. Hoàn
                                        Kiếm
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-800">
                                    <Flag className="w-5 h-5" />
                                    <span className="font-medium">
                                        Loại hình:
                                    </span>
                                    <span className="text-[#D02028] font-medium">
                                        Gọi món Á-Âu
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-800">
                                    <Clock className="w-5 h-5" />
                                    <span className="font-medium">
                                        Giờ mở cửa:
                                    </span>
                                    <span className="text-[#D02028] font-medium">
                                        08:00 - 22:00
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-1 sticky top-16 px-4 py-2 bg-white flex flex-col items-center gap-2 rounded-md">
                                <h3 className="text-lg flex items-center gap-1 font-medium">
                                    Đặt chỗ{" "}
                                    <p className="text-base text-gray-700 font-medium">
                                        (Để có chỗ trước khi đến)
                                    </p>
                                </h3>
                                <span className="text-[#D02028] font-bold text-sm">
                                    Ưu đãi hấp dẫn
                                </span>
                                <div className="flex flex-col gap-4">
                                    <div className="flex w-full gap-2">
                                        <div className="flex flex-col gap-2">
                                            <label
                                                htmlFor="number-person"
                                                className="flex items-center font-medium text-sm gap-1 text-gray-800"
                                            >
                                                <UserRound className="w-5 h-5" />{" "}
                                                Người lớn
                                            </label>
                                            <AtomDropdown
                                                id="number-person"
                                                // className="w-[207px] h-[34px] rounded-none text-gray-600"
                                                options={[
                                                    { value: "1", label: "1" },
                                                    { value: "2", label: "2" },
                                                    { value: "3", label: "3" },
                                                    { value: "4", label: "4" },
                                                    { value: "5", label: "5" },
                                                    { value: "6", label: "6" },
                                                    { value: "7", label: "7" },
                                                    { value: "8", label: "8" },
                                                    { value: "9", label: "9" },
                                                    {
                                                        value: "10",
                                                        label: "10",
                                                    },
                                                ]}
                                                value="1"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label
                                                htmlFor="number-baby"
                                                className="flex items-center font-medium text-sm gap-1 text-gray-800"
                                            >
                                                <Baby className="w-5 h-5" /> Trẻ
                                                em
                                            </label>
                                            <AtomDropdown
                                                id="number-baby"
                                                // className="w-[207px] h-[34px] rounded-none text-gray-600"
                                                options={[
                                                    { value: "1", label: "1" },
                                                    { value: "2", label: "2" },
                                                    { value: "3", label: "3" },
                                                    { value: "4", label: "4" },
                                                    { value: "5", label: "5" },
                                                    { value: "6", label: "6" },
                                                    { value: "7", label: "7" },
                                                    { value: "8", label: "8" },
                                                    { value: "9", label: "9" },
                                                    {
                                                        value: "10",
                                                        label: "10",
                                                    },
                                                ]}
                                                value="1"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full gap-2">
                                        <div className="flex flex-col gap-2 w-full">
                                            <label
                                                htmlFor="date"
                                                className="flex items-center font-medium text-sm gap-1 text-gray-800"
                                            >
                                                <Clock className="w-5 h-5" />{" "}
                                                Thời gian
                                            </label>
                                            <div className="flex w-full gap-2">
                                                <DatePicker
                                                    onChange={onChange}
                                                    className="h-[38px] border w-full hover:border-gray-300 focus:border-gray-300 active:border-gray-300"
                                                />
                                                <AtomDropdown
                                                    id="time"
                                                    // className="w-[207px] h-[34px] rounded-none text-gray-600"
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "01:00",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "01:15",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "01:30",
                                                        },
                                                        {
                                                            value: "4",
                                                            label: "01:45",
                                                        },
                                                        {
                                                            value: "5",
                                                            label: "02:00",
                                                        },
                                                        {
                                                            value: "6",
                                                            label: "02:15",
                                                        },
                                                        {
                                                            value: "7",
                                                            label: "02:30",
                                                        },
                                                        {
                                                            value: "8",
                                                            label: "02:45",
                                                        },
                                                        {
                                                            value: "9",
                                                            label: "03:00",
                                                        },
                                                        {
                                                            value: "10",
                                                            label: "03:15",
                                                        },
                                                        {
                                                            value: "11",
                                                            label: "03:30",
                                                        },
                                                        {
                                                            value: "12",
                                                            label: "03:45",
                                                        },
                                                        {
                                                            value: "13",
                                                            label: "04:00",
                                                        },
                                                        {
                                                            value: "14",
                                                            label: "04:15",
                                                        },
                                                        {
                                                            value: "15",
                                                            label: "04:30",
                                                        },
                                                        {
                                                            value: "16",
                                                            label: "04:45",
                                                        },
                                                        {
                                                            value: "17",
                                                            label: "05:00",
                                                        },
                                                        {
                                                            value: "18",
                                                            label: "05:15",
                                                        },
                                                        {
                                                            value: "19",
                                                            label: "05:30",
                                                        },
                                                        {
                                                            value: "20",
                                                            label: "05:45",
                                                        },
                                                        {
                                                            value: "21",
                                                            label: "06:00",
                                                        },
                                                        {
                                                            value: "22",
                                                            label: "06:15",
                                                        },
                                                        {
                                                            value: "23",
                                                            label: "06:30",
                                                        },
                                                        {
                                                            value: "24",
                                                            label: "06:45",
                                                        },
                                                        {
                                                            value: "25",
                                                            label: "07:00",
                                                        },
                                                        {
                                                            value: "26",
                                                            label: "07:15",
                                                        },
                                                        {
                                                            value: "27",
                                                            label: "07:30",
                                                        },
                                                        {
                                                            value: "28",
                                                            label: "07:45",
                                                        },
                                                        {
                                                            value: "29",
                                                            label: "08:00",
                                                        },
                                                        {
                                                            value: "30",
                                                            label: "08:15",
                                                        },
                                                        {
                                                            value: "31",
                                                            label: "08:30",
                                                        },
                                                        {
                                                            value: "32",
                                                            label: "08:45",
                                                        },
                                                        {
                                                            value: "33",
                                                            label: "09:00",
                                                        },
                                                        {
                                                            value: "34",
                                                            label: "09:15",
                                                        },
                                                        {
                                                            value: "35",
                                                            label: "09:30",
                                                        },
                                                        {
                                                            value: "36",
                                                            label: "09:45",
                                                        },
                                                        {
                                                            value: "37",
                                                            label: "10:00",
                                                        },
                                                        {
                                                            value: "38",
                                                            label: "10:15",
                                                        },
                                                        {
                                                            value: "39",
                                                            label: "10:30",
                                                        },
                                                    ]}
                                                    value="1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => navigate("/restaurant/1/booking")} className="w-full bg-[#D02028] mt-4 mb-2 text-white h-[38px] rounded-md font-medium">
                                        Đặt chỗ
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-2 px-4 py-2 bg-white flex flex-col gap-2 rounded-md">
                                <h2 className="py-1 text-[20px] font-semibold">
                                    Tóm tắt
                                </h2>
                                <div className="text-sm">
                                    PHÙ HỢP:Đặt tiệc, liên hoan, tụ họp bạn bè,
                                    gia đình, sinh nhậtMÓN ĐẶC SẮC: GHẸ, BỀ BỀ,
                                    TÔM CÀNG SEN, ỐC HƯƠNG, CÁ HỒI,
                                    DIMSUM,…KHÔNG GIAN: - Phong cách Hồng Kông -
                                    Sức chứa: 500 khách CHỖ ĐỂ XE: - Xe ô tô:
                                    Tầng hầm của toà nhà (Phí phụ thuộc đơn vị
                                    trông giữ xe) - Xe máy: Tầng hầm của toà nhà
                                    (Phí phụ thuộc đơn vị trông giữ xe) ĐIỂM ĐẶC
                                    TRƯNG: Buffet hải sản hơn 200 món, quầy line
                                    rộng rãi, phục vụ liên tục.
                                </div>
                            </div>
                            <div className="col-span-2 px-4 py-2 bg-white flex flex-col gap-2 rounded-md">
                                <h2 className="py-1 text-[20px] font-semibold">
                                    Quy định
                                </h2>
                                <div className="text-sm">
                                    PHÙ HỢP:Đặt tiệc, liên hoan, tụ họp bạn bè,
                                    gia đình, sinh nhậtMÓN ĐẶC SẮC: GHẸ, BỀ BỀ,
                                    TÔM CÀNG SEN, ỐC HƯƠNG, CÁ HỒI,
                                    DIMSUM,…KHÔNG GIAN: - Phong cách Hồng Kông -
                                    Sức chứa: 500 khách CHỖ ĐỂ XE: - Xe ô tô:
                                    Tầng hầm của toà nhà (Phí phụ thuộc đơn vị
                                    trông giữ xe) - Xe máy: Tầng hầm của toà nhà
                                    (Phí phụ thuộc đơn vị trông giữ xe) ĐIỂM ĐẶC
                                    TRƯNG: Buffet hải sản hơn 200 món, quầy line
                                    rộng rãi, phục vụ liên tục.
                                </div>
                            </div>
                            <div className="col-span-2 px-4 py-2 bg-white flex flex-col gap-2 rounded-md">
                                <h2 className="py-1 text-[20px] font-semibold">
                                    Quy định
                                </h2>
                                <div className="text-sm">
                                    PHÙ HỢP:Đặt tiệc, liên hoan, tụ họp bạn bè,
                                    gia đình, sinh nhậtMÓN ĐẶC SẮC: GHẸ, BỀ BỀ,
                                    TÔM CÀNG SEN, ỐC HƯƠNG, CÁ HỒI,
                                    DIMSUM,…KHÔNG GIAN: - Phong cách Hồng Kông -
                                    Sức chứa: 500 khách CHỖ ĐỂ XE: - Xe ô tô:
                                    Tầng hầm của toà nhà (Phí phụ thuộc đơn vị
                                    trông giữ xe) - Xe máy: Tầng hầm của toà nhà
                                    (Phí phụ thuộc đơn vị trông giữ xe) ĐIỂM ĐẶC
                                    TRƯNG: Buffet hải sản hơn 200 món, quầy line
                                    rộng rãi, phục vụ liên tục.
                                </div>
                            </div>
                            <div className="col-span-2 px-4 py-2 bg-white flex flex-col gap-2 rounded-md">
                                <h2 className="py-1 text-[20px] font-semibold">
                                    Quy định
                                </h2>
                                <div className="text-sm">
                                    PHÙ HỢP:Đặt tiệc, liên hoan, tụ họp bạn bè,
                                    gia đình, sinh nhậtMÓN ĐẶC SẮC: GHẸ, BỀ BỀ,
                                    TÔM CÀNG SEN, ỐC HƯƠNG, CÁ HỒI,
                                    DIMSUM,…KHÔNG GIAN: - Phong cách Hồng Kông -
                                    Sức chứa: 500 khách CHỖ ĐỂ XE: - Xe ô tô:
                                    Tầng hầm của toà nhà (Phí phụ thuộc đơn vị
                                    trông giữ xe) - Xe máy: Tầng hầm của toà nhà
                                    (Phí phụ thuộc đơn vị trông giữ xe) ĐIỂM ĐẶC
                                    TRƯNG: Buffet hải sản hơn 200 món, quầy line
                                    rộng rãi, phục vụ liên tục.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

