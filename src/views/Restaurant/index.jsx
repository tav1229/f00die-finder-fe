import { Search, ListFilter } from "lucide-react";
import AtomDropdown from "@/components/Atoms/AtomDropdown";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useRestaurantStore } from "@/storages/restaurant";
import RestaurantCard from "../../components/RestaurantCard";
import { getRestaurants } from "../../apis/restaurant";
import { Pagination } from "@mantine/core";
import SkeletonRestaurantCard from "../../components/SkeletonRestaurantCard2";

export default function Restaurant() {
    // const { restaurants, setRestaurants } = useRestaurantStore();
    const [restaurants, setRestaurants] = useState([]);
    const [searchParams] = useSearchParams();
    const [meta, setMeta] = useState({
        pageSize: 1,
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);

    const [searchContent, setSearchContent] = useState({})

    useEffect(() => {
        const handleFilter = async () => {
            setRestaurants([])
            // Lấy các tham số từ URL
            const provinceOrCity = searchParams.get("provinceOrCityId");
            const district = searchParams.get("districtId");
            const servingType = searchParams.get("servingType");
            const cuisineType = searchParams.get("cuisineType");
            const customerType = searchParams.get("customerType");
            const priceRangePerPerson = searchParams.get("priceRangePerPerson");
            const searchValue = searchParams.get("searchValue");

            const contentName = {
                provinceOrCityName: searchParams.get("provinceOrCityName"),
                districtName: searchParams.get("districtName"),
                servingTypeName: searchParams.get("servingTypeName"),
                cuisineTypeName: searchParams.get("cuisineTypeName"),
                customerTypeName: searchParams.get("customerTypeName"),
                priceRangePerPersonName: searchParams.get("priceRangePerPersonName"),
                searchValue: searchParams.get("")
            }
            setSearchContent(contentName)

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
            setRestaurants([])
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
                        <div class="w-full flex gap-3">
                            {
                                searchContent?.provinceOrCityName && (
                                    <div class="flex items-center gap-2">
                                        <span className="text-gray-700">| Vị trí:</span>
                                        <span className="text-[#d02028]">{searchContent?.provinceOrCityName} {searchContent?.districtName && <>, {searchContent?.districtName}</>}</span>
                                    </div>
                                )
                            }
                            {
                                searchContent?.cuisineTypeName && (
                                    <div class="flex items-center gap-2">
                                        <span className="text-gray-700">| Loại món ăn:</span>
                                        <span className="text-[#d02028]">{searchContent?.cuisineTypeName}</span>
                                    </div>
                                )
                            }
                            {
                                searchContent?.customerTypeName && (
                                    <div class="flex items-center gap-2">
                                        <span className="text-gray-700">| Kiểu khách hàng:</span>
                                        <span className="text-[#d02028]">{searchContent?.customerTypeName}</span>
                                    </div>
                                )
                            }
                            {
                                searchContent?.servingTypeName && (
                                    <div class="flex items-center gap-2">
                                        <span className=" text-gray-700">| Loại dịch vụ:</span>
                                        <span className=" text-[#d02028]">{searchContent?.servingTypeName}</span>
                                    </div>
                                )
                            }
                            {
                                searchContent?.provinceOrCityName && (
                                    <div class="flex items-center gap-2">
                                        <span className="text-gray-700">| Mức giá:</span>
                                        <span className="text-[#d02028]">{searchContent?.priceRangePerPersonName}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className={restaurants.length > 0 ? "w-full grid grid-cols-5 gap-4" : "w-full flex flex-wrap gap-3"}>
                            {restaurants?.map((item, index) => (
                                <RestaurantCard key={index} restaurant={item} />
                            ))}
                            {
                                restaurants.length === 0 && (
                                    <>
                                        <SkeletonRestaurantCard />
                                        <SkeletonRestaurantCard />
                                        <SkeletonRestaurantCard />
                                        <SkeletonRestaurantCard />
                                        <SkeletonRestaurantCard /></>
                                )
                            }
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
