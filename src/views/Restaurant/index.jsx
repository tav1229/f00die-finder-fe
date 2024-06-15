import { Search, ListFilter } from "lucide-react";
import AtomDropdown from "@/components/Atoms/AtomDropdown";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useRestaurantStore } from "@/storages/restaurant";
import RestaurantCard from "../../components/RestaurantCard";
import { getRestaurants } from "../../apis/restaurant";
import { Pagination } from "@mantine/core";

export default function Restaurant() {
    // const { restaurants, setRestaurants } = useRestaurantStore();
    const [restaurants, setRestaurants] = useState([]);
    const [searchParams] = useSearchParams();
    const [meta, setMeta] = useState({
        pageSize: 1,
        currentPage: 1,
        totalPages: 1,
        totalCount: 1,
    });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const handleFilter = async () => {
            // Lấy các tham số từ URL
            const provinceOrCity = searchParams.get("provinceOrCityId");
            const district = searchParams.get("districtId");
            const servingType = searchParams.get("servingType");
            const cuisineType = searchParams.get("cuisineType");
            const customerType = searchParams.get("customerType");
            const priceRangePerPerson = searchParams.get("priceRangePerPerson");
            const searchValue = searchParams.get("searchValue");

            const response = await getRestaurants({
                provinceOrCityId: provinceOrCity,
                districtId: district,
                servingType: servingType,
                cuisineType: cuisineType,
                customerType: customerType,
                priceRangePerPerson: priceRangePerPerson,
                searchValue: searchValue,
            });
            setRestaurants(response.data);
            setMeta(response.meta);
        };

        handleFilter();
    }, [searchParams]);

    const handlePageChange = (page) => {
        const fetchRestaurants = async () => {
            try {
                const response = await getRestaurants(
                    {
                        provinceOrCityId: searchParams.get("provinceOrCityId"),
                        districtId: searchParams.get("districtId"),
                        servingType: searchParams.get("servingType"),
                        cuisineType: searchParams.get("cuisineType"),
                        customerType: searchParams.get("customerType"),
                        priceRangePerPerson: searchParams.get(
                            "priceRangePerPerson"
                        ),
                        searchValue: searchParams.get("searchValue"),
                    },
                    page
                );
                setRestaurants(response.data);
                setMeta(response.meta);
            } catch (error) {
                console.error(
                    `Error in fetchRestaurants request: ${error.message}`
                );
            }
        };

        fetchRestaurants();
    };
    return (
        <section className="flex flex-col w-full max-w-[1280px]">
            {/* <div className="w-full flex bg-[#F7F6F4] flex-col gap-5 py-5 px-7">
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
            </div> */}

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
                                    ({meta?.totalCount ?? 0}) điểm đến
                                </span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <span className="text-sm font-semibold text-gray-500">
                                    Sắp xếp:
                                </span>
                                <AtomDropdown
                                    className="w-[207px] h-[34px] rounded-none text-gray-600"
                                    options={[
                                        { id: "1", name: "Mặc định" },
                                        {
                                            id: "2",
                                            name: "Giá thấp đến cao",
                                        },
                                        {
                                            id: "3",
                                            name: "Giá cao đến thấp",
                                        },
                                    ]}
                                    value="1"
                                />
                            </div>
                        </div>
                        <div className="w-full border-t border-gray-300"></div>
                        <div className="w-full grid grid-cols-5 gap-4">
                            {restaurants?.map((item, index) => (
                                // <Link
                                //     to={`/restaurant/${item.id}`}
                                //     key={index}
                                //     className=" bg-white shadow rounded-md"
                                // >
                                //     <div className="relative max-w-[282px] h-[282px]">
                                //         <img
                                //             src={item.images[0]}
                                //             className="w-full h-[282px] object-cover rounded-md"
                                //         />
                                //         <div className='absolute bottom-0 w-full py-2 rounded-b-md flex flex-col bg-[rgba(0,0,0,0.6)] items-center'>
                                //             <h2 className="text-base font-medium text-white">{item.name}</h2>
                                //             <div className="flex gap-1 items-center">
                                //                 <span className="text-sm text-[#D02028] font-semibold">
                                //                     {item.rating}
                                //                 </span>
                                //                 <img
                                //                     src="https://img.icons8.com/fluent/48/000000/star.png"
                                //                     className="w-4 h-4"
                                //                 />
                                //             </div>
                                //             <div className="text-sm font-medium text-gray-300">{item.location.address}</div>
                                //         </div>
                                //     </div>
                                //     <div className="flex flex-col items-center justify-center p-2 gap-1">
                                //         <h2 className="font-semibold text-[#D02028]">{item?.note}</h2>
                                //         <span className="text-sm font-medium text-gray-500">{item?.cuisineTypes[0].name}</span>
                                //         <button className="py-[8px] px-4 font-medium border hover:bg-[#D02028] hover:text-white rounded-md">Đặt chỗ ngay</button>
                                //     </div>
                                // </Link>
                                <RestaurantCard key={index} restaurant={item} />
                            ))}
                        </div>
                        <Pagination
                            total={meta.totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="#d02028"
                            radius="xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
