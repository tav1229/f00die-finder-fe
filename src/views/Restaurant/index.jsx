import { Search, ListFilter } from "lucide-react";
import AtomDropdown from "@/components/Atoms/AtomDropdown";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const danhSachNhaHang = [
    {
        key: "nha_hang_1",
        value: "Nhà hàng Hai Bà Trưng",
        img: "https://storage.pasgo.com.vn/PasGoGianHang/c9ae2aea-7b45-4001-a0ff-30c1c040fa9e.webp?Width=250&Type=webp",
        rating: 4,
        address: "123 Hai Bà Trưng, Quận 1, TP.HCM",
        note: "Giảm giá 10%",
    },
    {
        key: "nha_hang_2",
        value: "Nhà hàng Lẩu Bò",
        img: "https://storage.pasgo.com.vn/PasGoGianHang/7d7762bf-77d7-4a11-a3c1-c27e547464bc.webp?Width=250&Type=webp",
        rating: 4,
        address: "123 Hai Bà Trưng, Quận 1, TP.HCM",
        note: "Giảm giá 10%",
    },
    {
        key: "nha_hang_3",
        value: "Nhà hàng Cơm niêu Hồng Phúc",
        img: "https://storage.pasgo.com.vn/PasGoGianHang/0f049c11-7b95-4af6-9dc7-727921820ef3.webp?Width=250&Type=webp",
        rating: 4,
        address: "123 Hai Bà Trưng, Quận 1, TP.HCM",
        note: "Giảm giá 10%",
    },
    {
        key: "nha_hang_4",
        value: "Nhà hàng Hương Việt",
        img: "https://storage.pasgo.com.vn/PasGoGianHang/f7cdfe9e-525f-4a6c-8d92-980a04f53ca0.webp?Width=250&Type=webp",
        rating: 4,
        address: "123 Hai Bà Trưng, Quận 1, TP.HCM",
        note: "Giảm giá 10%",
    },
    {
        key: "nha_hang_5",
        value: "Buffet Hàn Quốc Seoul Garden",
        img: "https://storage.pasgo.com.vn/PasGoGianHang/02d1e571-5866-4385-a9b0-cc454ee82edf.webp?Width=250&Type=webp",
        rating: 4,
        address: "123 Hai Bà Trưng, Quận 1, TP.HCM",
        note: "Giảm giá 10%",
    },
    {
        key: "nha_hang_6",
        value: "Nhà hàng Lẩu Thái Lan",
        img: "https://storage.pasgo.com.vn/PasGoGianHang/a8bd33d4-4be9-4d4a-b1ca-51532eff92e1.webp?Width=250&Type=webp",
        rating: 4,
        address: "123 Hai Bà Trưng, Quận 1, TP.HCM",
        note: "Giảm giá 10%",
    },
];
export default function Restaurant() {
    return (
        <section className="flex flex-col w-full max-w-[1280px]">
            <div className="w-full flex bg-[#F7F6F4] flex-col gap-5 py-5 px-7">
                <div className="search  flex justify-center items-center w-3/4 gap-4">
                    <input
                        type="text"
                        id="default-input"
                        className="bg-gray-50 border border-[#CCCCCC] h-[34px] outline-none text-gray-700 font-medium text-sm rounded-md block w-full p-2"
                    />
                    <button className="flex justify-center items-center gap-2 rounded-md h-[34px] flex-shrink-0 py-2 px-5 bg-[#D02028] text-white font-medium">
                        <Search className="w-5 h-5" />
                        <p>Tìm kiếm</p>
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-col justify-center items-center bg-[#F7F6F4]">
                <div className="w-full max-w-[1200px] flex flex-col gap-5">
                    <div className="flex justify-start items-center gap-1">
                        <Link
                            to="/"
                            className="text-gray-500 font-medium hover:text-[#D02028]"
                        >
                            Trang chủ
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-500 relative top-[2px]" />
                        <span className="text-[#D02028] font-medium">
                            Kết quả lọc nhanh
                        </span>
                    </div>
                    <div className="w-full bg-white flex flex-col py-5 px-3 gap-5 shadow">
                        <div className="flex w-full justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="text-lg  font-medium">
                                    {"Kết quả lọc"}
                                </span>
                                <div className="h-[18px] border-l-2 border-gray-500"></div>
                                <span className="text-base text-gray-500 font-medium">
                                    Tìm thấy:
                                </span>
                                <span className="text-[#D02028] font-semibold">
                                    (17) điểm đến
                                </span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <span className="text-sm font-semibold text-gray-500">
                                    Sắp xếp:
                                </span>
                                <AtomDropdown
                                    className="w-[207px] h-[34px] rounded-none text-gray-600"
                                    options={[
                                        { value: "1", label: "Mặc định" },
                                        {
                                            value: "2",
                                            label: "Giá thấp đến cao",
                                        },
                                        {
                                            value: "3",
                                            label: "Giá cao đến thấp",
                                        },
                                    ]}
                                    value="1"
                                />
                            </div>
                        </div>
                        <div className="w-full border-t border-gray-300"></div>
                        <div className="w-full grid grid-cols-4 gap-4">
                            {danhSachNhaHang.map((item, index) => (
                                <div
                                    key={index}
                                    className=" bg-white shadow rounded-md"
                                >
                                    <div className="relative w-[282px] h-[282px]">
                                        <img
                                            src={item.img}
                                            className="w-full h-[282px] object-cover rounded-md"
                                        />
                                        <div className='absolute bottom-0 w-full py-2 rounded-b-md flex flex-col bg-[rgba(0,0,0,0.6)] items-center'>
                                            <h2 className="text-base font-medium text-white">{item.value}</h2>
                                            <div className="flex gap-1 items-center">
                                                <span className="text-sm text-[#D02028] font-semibold">
                                                    {item.rating}
                                                </span>
                                                <img
                                                    src="https://img.icons8.com/fluent/48/000000/star.png"
                                                    className="w-4 h-4"
                                                />
                                            </div>
                                            <div className="text-sm font-medium text-gray-300">{item.address}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-2 gap-1">
                                        <h2 className="font-semibold text-[#D02028]">{item.note}</h2>
                                        <span className="text-sm font-medium text-gray-500">Chuyên món hải sản</span>
                                        <button className="py-[8px] px-4 font-medium border hover:bg-[#D02028] hover:text-white rounded-md">Đặt chỗ ngay</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
