import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import { Table } from "antd";
import {
    getReservationMyRestaurant,
    updateReservationStatus,
} from "../../apis/reservation";
import { Search } from "lucide-react";
import { Pagination } from "@mantine/core";

export default function BookingManagement() {
    const [activeTab, setActiveTab] = useState(-1);
    const [reservations, setReservations] = useState([]);
    const activeButton =
        "px-3 py-1 text-sm font-medium border-b border-b-2 border-[#F01B23] box-sizing";
    const inactiveButton = "px-3 py-1 text-sm font-medium";
    const [meta, setMeta] = useState({
        pageSize: 1,
        currentPage: 1,
        totalPages: 1,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const fetchReservation = async () => {
            const response = await getReservationMyRestaurant();
            if (response.status === 200) {
                const transformedArray = response.data.map((item) => {
                    const { date, time } = formatDateAndTime(item.time);
                    return {
                        ...item,
                        date,
                        time,
                        createdDate: removeTicks(item.createdDate),
                    };
                });
                setReservations(transformedArray);
                setMeta(response.meta);
            }
        };
        fetchReservation();
    }, []);

    const removeTicks = (dateString) => {
        return dateString.replace(/T/g, " ").replace(/\..+/, "");
    };

    const filterReservations = async (status, page) => {
        setActiveTab(status);
        const response = await getReservationMyRestaurant(10, page, status, searchValue);
        try {
            if (response.status === 200) {
                const transformedArray = response.data.map((item) => {
                    const { date, time } = formatDateAndTime(item.time);
                    return {
                        ...item,
                        date,
                        time,
                        createdDate: removeTicks(item.createdDate),
                    };
                });
                setReservations(transformedArray);
                setMeta(response.meta);
                setCurrentPage(page);
            }
        } catch (error) {
            console.error("Error filtering reservations:", error);
        }
    };

    const columns = [
        {
            title: "Tên",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "SĐT",
            dataIndex: "customerPhone",
            key: "customerPhone",
        },
        {
            title: "Email",
            dataIndex: "customerEmail",
            key: "customerEmail",
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdDate",
            key: "createdDate",
        },
        {
            title: "Ngày đặt trước",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Giờ đặt trước",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Số người lớn",
            dataIndex: "numberOfAdults",
            key: "numberOfAdults",
        },
        {
            title: "Số trẻ em",
            dataIndex: "numberOfChildren",
            key: "numberOfChildren",
        },
        {
            title: "Trạng thái",
            dataIndex: "reservationStatus",
            key: "reservationStatus",
            render: (_, { reservationStatus }) => (
                <span
                    className={`px-2 py-1 text-xs text-center font-semibold rounded-full min-w-24 block ${reservationStatus === 0
                            ? "bg-[#FFC522] text-white"
                            : reservationStatus === 1
                                ? "bg-[#8BC24A] text-white"
                                : reservationStatus === 2
                                    ? "bg-[#F01B23] text-white"
                                    : ""
                        }`}
                >
                    {statusName(reservationStatus)}
                </span>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (record) => (
                <>
                    {record.reservationStatus === 0 && (
                        <div className="flex flex-col gap-2">
                            <button
                                className="px-3 py-1 min-w-28 block border-[1.5px] border-[#8BC24A] text-[#8bc24a] rounded-md transition-all hover:bg-[#8bc24a] hover:text-white"
                                onClick={() => handleUpdateStatus(record.id, 1)}
                            >
                                Chấp thuận
                            </button>
                            <button
                                className="px-3 py-1 border-[1.5px] border-[#F01B23] text-[#F01B23] rounded-md transition-all hover:bg-[#F01B23] hover:text-white"
                                onClick={() => handleUpdateStatus(record.id, 2)}
                            >
                                Từ chối
                            </button>
                        </div>
                    )}
                </>
            ),
        },
    ];

    const statusName = (status) => {
        switch (status) {
            case 0:
                return "Chờ xử lý";
            case 1:
                return "Đã chấp thuận";
            case 2:
                return "Đã từ chối";
            default:
                return "Đã hủy";
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const response = await updateReservationStatus(id, status);
            if (response.status === 200) {
                // Cập nhật trạng thái thành công, cập nhật lại danh sách đặt chỗ
                setReservations(
                    reservations.map((reservation) => {
                        if (reservation.id === id) {
                            return {
                                ...reservation,
                                reservationStatus: status,
                            };
                        }
                        return reservation;
                    })
                );
            } else {
                //
            }
        } catch (error) {
            console.error("Error updating reservation status:", error);
        }
    };

    const formatDateAndTime = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

        return {
            date: formattedDate,
            time: formattedTime,
        };
    };

    return (
        <section className="flex justify-center bg-[#EEEEEE] w-full">
            <div className="grid grid-cols-5 gap-4 w-full p-4 max-w-[1280px] min-h-screen">
                <div className="col-span-1 h-auto">
                    <Navigation />
                </div>
                <div className="col-span-4 flex flex-col rounded-md bg-white py-3 px-5">
                    <h1 className="text-lg font-semibold">Quản lý đặt bàn</h1>

                    <nav className="flex gap-3 w-full py-5 justify-between">
                        <div>
                            <button
                                className={
                                    activeTab === -1 ? activeButton : inactiveButton
                                }
                                onClick={() => filterReservations(-1)}
                            >
                                Tất cả
                            </button>
                            <button
                                className={
                                    activeTab === 0 ? activeButton : inactiveButton
                                }
                                onClick={() => filterReservations(0)}
                            >
                                Chờ xử lý
                            </button>
                            <button
                                className={
                                    activeTab === 1 ? activeButton : inactiveButton
                                }
                                onClick={() => filterReservations(1)}
                            >
                                Đã chấp thuận
                            </button>
                            <button
                                className={
                                    activeTab === 2 ? activeButton : inactiveButton
                                }
                                onClick={() => filterReservations(2)}
                            >
                                Đã từ chối
                            </button>
                            <button
                                className={
                                    activeTab === 3 ? activeButton : inactiveButton
                                }
                                onClick={() => filterReservations(3)}
                            >
                                Đã hủy
                            </button>
                        </div>

                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                className="border border-gray-300 px-2 py-1 rounded-md"
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <button className="px-3 py-1 bg-[#F01B23] text-white rounded-md" onClick={() => filterReservations(activeTab, 1)}>
                                <Search size={20} />
                            </button>
                        </div>
                    </nav>

                    <aside className="w-full">
                        <Table
                            dataSource={reservations}
                            columns={columns}
                            className="overflow-auto"
                            scroll={{ x: 900 }}
                            pagination={false}
                        />
                    </aside>
                    <div className="flex justify-end py-6 px-5">
                            <Pagination
                                total={meta.totalPages}
                                page={currentPage}
                                onChange={(page) => filterReservations(activeTab, page)}
                                color="#d02028"
                                radius="xl"
                            />
                        </div>
                </div>
            </div>
        </section>
    );
}
