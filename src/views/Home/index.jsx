import { Search, ListFilter } from "lucide-react";
import AtomDropdown from "@/components/Atoms/AtomDropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const options = [
    { label: "All", value: "all" },
    { label: "Movies", value: "movies" },
    { label: "TV Shows", value: "tv-shows" },
];

const danhMucMonAn = [
    {
        key: "lau",
        value: "Lẩu",
        label: "Hotpot",
        img: "https://pastaxi-manager.onepas.vn/Upload/DanhMucHienThi/Avatar/638441023317916801-icon-lau.png?Width=70&Type=webp",
    },
    {
        key: "nuong",
        value: "Nướng",
        label: "Grill",
        img: "https://pastaxi-manager.onepas.vn/Upload/DanhMucHienThi/Avatar/638441027537096717-icon-nuong.png?Width=70&Type=webp",
    },
    {
        key: "buffet",
        value: "Buffet",
        label: "Buffet",
        img: "https://pastaxi-manager.onepas.vn/Upload/DanhMucHienThi/Avatar/638441026480345540-icon-buffet.png?Width=70&Type=webp",
    },
    {
        key: "hai_san",
        value: "Hải sản",
        label: "Seafood",
        img: "https://pastaxi-manager.onepas.vn/Upload/DanhMucHienThi/Avatar/638011847245865102-hai-san-pasgo.png?Width=70&Type=webp",
    },
    {
        key: "quan_nhau",
        value: "Quán nhậu",
        label: "Bar",
        img: "https://pastaxi-manager.onepas.vn/Upload/DanhMucHienThi/Avatar/638011851008641451-quan-nhau-pasgo.png?Width=70&Type=webp",
    },
    {
        key: "mon_han",
        value: "Món Hàn",
        label: "Korean food",
        img: "https://pastaxi-manager.onepas.vn/Upload/DanhMucHienThi/Avatar/638442738231563544-mon-han.png?Width=70&Type=webp",
    },
    {
        key: "mon_nhat",
        value: "Món Nhật",
        label: "Japanese food",
        img: "https://pastaxi-manager.onepas.vn/Upload/DanhMucHienThi/Avatar/638011867970619295-mon-nhat-ban-pasgo.png?Width=70&Type=webp",
    },
    {
        key: "mon_chay",
        value: "Món Chay",
        label: "Vegetarian food",
        img: "https://pastaxi-manager.onepas.vn/Upload/DanhMucHienThi/Avatar/638011884827831221-mon-chay-pasgo.png?Width=70&Type=webp",
    },
    {
        key: "mon_chau_au",
        value: "Món Châu Âu",
        label: "European food",
        img: "https://pastaxi-manager.onepas.vn/Upload/DanhMucHienThi/Avatar/638239806231357799-mon-chau-au.png?Width=70&Type=webp",
    },
];

const danhSachNhaHang = [
    {
        key: "nha_hang_1",
        value: "Nhà hàng Hai Bà Trưng",
        img: "https://storage.pasgo.com.vn/PasGoGianHang/c9ae2aea-7b45-4001-a0ff-30c1c040fa9e.webp?Width=250&Type=webp",
    },
    {
        key: "nha_hang_2",
        value: "Nhà hàng Lẩu Bò",
        img: "https://storage.pasgo.com.vn/PasGoGianHang/7d7762bf-77d7-4a11-a3c1-c27e547464bc.webp?Width=250&Type=webp",
    },
    {
        key: "nha_hang_3",
        value: "Nhà hàng Cơm niêu Hồng Phúc",
        img: "https://storage.pasgo.com.vn/PasGoGianHang/0f049c11-7b95-4af6-9dc7-727921820ef3.webp?Width=250&Type=webp",
    },
    {
        key: "nha_hang_4",
        value: "Nhà hàng Hương Việt",
        img: "https://storage.pasgo.com.vn/PasGoGianHang/f7cdfe9e-525f-4a6c-8d92-980a04f53ca0.webp?Width=250&Type=webp",
    },
    {
        key: "nha_hang_5",
        value: "Buffet Hàn Quốc Seoul Garden",
        img: "https://storage.pasgo.com.vn/PasGoGianHang/02d1e571-5866-4385-a9b0-cc454ee82edf.webp?Width=250&Type=webp",
    },
    {
        key: "nha_hang_6",
        value: "Nhà hàng Lẩu Thái Lan",
        img: "https://storage.pasgo.com.vn/PasGoGianHang/a8bd33d4-4be9-4d4a-b1ca-51532eff92e1.webp?Width=250&Type=webp",
    },
];
export default function Home() {
    const navigate = useNavigate();
    return (
        <section className="flex flex-col w-full max-w-[1280px]">
            <div className="w-full flex bg-[#F7F6F4] flex-col gap-5 py-8 px-5">
                <div className="search  flex justify-center items-center w-3/4 gap-4">
                    <input
                        type="text"
                        id="default-input"
                        className="bg-gray-50 border border-[#CCCCCC] h-[34px] outline-none text-gray-700 font-medium text-sm rounded-md block w-full p-2"
                    />
                    <button
                        onClick={() => navigate("/restaurant")}
                        className="flex justify-center items-center gap-2 rounded-md h-[34px] flex-shrink-0 py-2 px-5 bg-[#D02028] text-white font-medium"
                    >
                        <Search className="w-5 h-5" />
                        <p>Tìm kiếm</p>
                    </button>
                </div>
                <div className="flex justify-center items-center w-5/6 gap-5">
                    <AtomDropdown options={options} />
                    <AtomDropdown options={options} />
                    <AtomDropdown options={options} />
                    <AtomDropdown options={options} />
                    <AtomDropdown options={options} />
                    <button
                        onClick={() => navigate("/restaurant")}
                        className="flex justify-center ml-10 gap-2 border border-1 border-[#CCCCCC] items-center rounded-md h-10 py-2 px-6  text-gray-800 font-medium"
                    >
                        <ListFilter className="w-5 h-5" />
                        <p>Lọc</p>
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-col gap-1 py-5 px-14">
                <h1 className="text-2xl font-bold">Danh mục</h1>
                <Carousel
                    className="w-full"
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-1 gap-5">
                        {danhMucMonAn.map((monAn, index) => (
                            <CarouselItem
                                key={index}
                                className="flex flex-col items-center h-[142px] w-[140px] justify-center pl-1 md:basis-1/5 lg:basis-[14%] cursor-pointer group"
                            >
                                <div onClick={() => navigate("/restaurant")} className="flex flex-col items-center gap-1 justify-center">
                                    <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                                        <img
                                            src={monAn.img}
                                            className="w-10 h-10"
                                            alt=""
                                        />
                                    </div>
                                    <span className="text-sm font-semibold">
                                        {monAn.value}
                                    </span>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hover:bg-[#D02028] hover:text-white" />
                    <CarouselNext className="hover:bg-[#D02028] hover:text-white" />
                </Carousel>
            </div>

            <div className="flex flex-col w-full px-14 gap-3">
                <h1 className="text-2xl font-bold">
                    Danh sách nhà hàng nổi bật
                </h1>
                <Carousel
                    className="w-full"
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-1 gap-2">
                        {danhSachNhaHang.map((monAn, index) => (
                            <CarouselItem
                                key={index}
                                className="flex flex-col items-start h-[300px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 cursor-pointer group"
                            >
                                <div onClick={() => navigate("/restaurant/1")} className="flex flex-col items-start relative gap-1 justify-start">
                                    <img
                                        src={monAn.img}
                                        className="w-[240px] h-[240px] rounded-t-md group-hover:contrast-[0.75]"
                                        alt=""
                                    />
                                    <div className="absolute py-1.5 px-1.5 rounded-sm bg-[#D02028] text-white font-medium text-xs">
                                        Được đề xuất
                                    </div>
                                    <span className="text-sm font-semibold">
                                        {monAn.value}
                                    </span>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hover:bg-[#D02028] hover:text-white" />
                    <CarouselNext className="hover:bg-[#D02028] hover:text-white" />
                </Carousel>
            </div>
            <div className="flex flex-col w-full px-14 gap-3">
                <h1 className="text-2xl font-bold">
                    Các nhà hàng, địa điểm ĐẶT TIỆC, TỔ CHỨC LIÊN HOAN, SỰ KIỆN
                </h1>
                <span className="text-sm font-medium text-[#333333]">
                    Xem ngay các địa điểm, nhà hàng đặt tiệc, liên hoan với đa
                    dạng mức giá & loại hình ẩm thực với quy mô tổ chức từ NHỎ
                    đến LỚN
                </span>
                <Carousel
                    className="w-full"
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-1 gap-2">
                        {danhSachNhaHang.map((monAn, index) => (
                            <CarouselItem
                                key={index}
                                className="flex flex-col items-start h-[300px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 "
                            >
                                <div onClick={() => navigate("/restaurant/1")} className="flex flex-col items-start relative gap-1 justify-start">
                                    <img
                                        src={monAn.img}
                                        className="w-[240px] h-[240px] rounded-t-md"
                                        alt=""
                                    />
                                    <div className="absolute py-1.5 px-1.5 rounded-sm bg-[#D02028] text-white font-medium text-xs">
                                        Được đề xuất
                                    </div>
                                    <span className="text-sm font-semibold">
                                        {monAn.value}
                                    </span>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hover:bg-[#D02028] hover:text-white" />
                    <CarouselNext className="hover:bg-[#D02028] hover:text-white" />
                </Carousel>
            </div>
        </section>
    );
}
