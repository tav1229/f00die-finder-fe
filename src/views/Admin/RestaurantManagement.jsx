import { getRestaurants, updateRestaurantStatus } from "@/apis/adminDashboard";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { Table } from "antd";
import { Pagination } from "@mantine/core";
import { Search } from "lucide-react";

const activeButton =
    "px-3 py-1 text-sm font-medium border-b border-b-2 border-[#F01B23] box-sizing";
const inactiveButton = "px-3 py-1 text-sm font-medium";
const statusName = (status) => {
    switch (status) {
        case -1:
            return "Tất cả";
        case 0:
            return "Hoạt động";
        case 1:
            return "Ngừng hoạt động";
        case 2:
            return "Chờ xét duyệt";
        default:
            return "";
    }
};
export default function RestaurantManagement() {
    const [restaurants, setRestaurants] = useState([]);
    const [activeTab, setActiveTab] = useState(-1);
    const [searchValue, setSearchValue] = useState("");
    const [meta, setMeta] = useState({
        pageSize: 1,
        currentPage: 1,
        totalPages: 1,
    });
    const [currentPage, setCurrentPage] = useState(1);

    const columns = [
        {
            title: "Tên nhà hàng",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Khu vực",
            dataIndex: "provinceOrCity",
            key: "provinceOrCity",
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdDate",
            key: "createdDate",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (_, { status }) => (
                <span
                    className={`px-2 py-1 text-xs text-center font-semibold rounded-full min-w-24 block ${status === 2
                        ? "bg-[#FFC522] text-white"
                        : status === 0
                            ? "bg-[#8BC24A] text-white"
                            : status === 1
                                ? "bg-[#F01B23] text-white"
                                : ""
                        }`}
                >
                    {statusName(status)}
                </span>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (record) => (
                <>
                    <div className="flex gap-1 flex-col">
                        {
                            record.status != 0 && (
                                <button
                                    className="px-3 py-1 min-w-28 block border-[1.5px] border-[#8BC24A] text-[#8bc24a] rounded-md transition-all hover:bg-[#8bc24a] hover:text-white"
                                    onClick={() => handleUpdateStatus(record.id, 0)}
                                >
                                    Chấp nhận
                                </button>
                            )
                        }
                        {
                            record.status != 1 && (
                                <button
                                    className="px-3 py-1 min-w-28 border-[1.5px] border-[#F01B23] text-[#F01B23] rounded-md transition-all hover:bg-[#F01B23] hover:text-white"
                                    onClick={() => handleUpdateStatus(record.id, 1)}
                                >
                                    Vô hiệu hóa
                                </button>
                            )
                        }
                    </div>
                </>
            ),
        },
    ];

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await getRestaurants();
                setRestaurants(response.data);
                setMeta(response.meta);
            } catch (error) {
                console.error(
                    `Error in fetchRestaurants request: ${error.message}`
                );
            }
        };

        fetchRestaurants();
    }, []);


    const handleUpdateStatus = async (id, status) => {
        try {
            const response = await updateRestaurantStatus(id, status);
            if (response.status === 200) {
                const updatedRestaurants = restaurants.map((restaurant) => {
                    if (restaurant.id === id) {
                        return {
                            ...restaurant,
                            status,
                        };
                    }
                    return restaurant;
                });
                setRestaurants(updatedRestaurants);
            }
        } catch (error) {
            console.error(
                `Error in handleUpdateStatus request: ${error.message}`
            );
        }
        console.log(id, status);
    };

    const handlePageChange = async (page) => {
        try {
            const response = await getRestaurants(page, 10, activeTab, searchValue);
            setRestaurants(response.data);
            setMeta(response.meta);
            setCurrentPage(page);
        } catch (error) {
            console.error(
                `Error in handlePageChange request: ${error.message}`
            );
        }
    };

    const filterRestaurants = async (status) => {
        const response = await getRestaurants(1, 10, status);
        setRestaurants(response.data);
        setMeta(response.meta);
        setCurrentPage(1);
        setActiveTab(status);
    };

    function formatDate(isoString) {
        const date = new Date(isoString);
        const day = date.getUTCDate().toString().padStart(2, "0");
        const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
        const year = date.getUTCFullYear();
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return (
        <section className="flex justify-center bg-[#EEEEEE] w-full">
            <div className="grid grid-cols-5 gap-4 w-full p-4 min-h-screen">
                <div className="col-span-1 h-auto">
                    <Navigation />
                </div>

                <div className="col-span-4 flex flex-col rounded-md px-5">
                    <h1 className="text-lg font-semibold">Quản lý đặt bàn</h1>
                    <nav className="flex gap-3 w-full py-5 justify-between">
                        <div className="flex gap-3 ">
                            <button
                                className={
                                    activeTab === -1 ? activeButton : inactiveButton
                                }
                                onClick={() => filterRestaurants(-1)}
                            >
                                Tất cả
                            </button>
                            <button
                                className={
                                    activeTab === 2 ? activeButton : inactiveButton
                                }
                                onClick={() => filterRestaurants(2)}
                            >
                                Chờ xét duyệt
                            </button>
                            <button
                                className={
                                    activeTab === 0 ? activeButton : inactiveButton
                                }
                                onClick={() => filterRestaurants(0)}
                            >
                                Hoạt động
                            </button>
                            <button
                                className={
                                    activeTab === 1 ? activeButton : inactiveButton
                                }
                                onClick={() => filterRestaurants(1)}
                            >
                                Ngừng hoạt động
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                className="px-3 py-1 border border-gray-300 rounded-md"
                                onChange={(e) => setSearchValue(e.target.value)}
                            />

                            <button className="px-3 py-1 bg-[#F01B23] text-white rounded-md" onClick={()=> handlePageChange(1)}>
                                <Search size={20} />
                            </button>
                        </div>
                    </nav>
                    <aside className="w-full bg-white">
                        <Table
                            dataSource={restaurants?.map((restaurant) => ({
                                ...restaurant,
                                createdDate: formatDate(restaurant.createdDate),
                                // address: restaurant.location.address,
                                // provinceOrCity: restaurant.provinceOrCity.name,
                            }))}
                            columns={columns}
                            className="overflow-auto"
                            scroll={{ x: 900 }}
                            pagination={false}
                        />
                        <div className="flex justify-end py-6 px-5">
                            <Pagination
                                total={meta.totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="#d02028"
                                radius="xl"
                            />
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
