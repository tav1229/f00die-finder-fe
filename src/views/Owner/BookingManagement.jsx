import Navigation from "./Navigation";
import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { Table } from "antd";

const columns = [
    {
        title: "Tên khách hàng",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Số điện thoại",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Ngày đặt",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Giờ đặt",
        dataIndex: "time",
        key: "time",
    },
    {
        title: "Người lớn",
        dataIndex: "guest",
        key: "guest",
    },
    {
        title: "Trẻ em",
        dataIndex: "childrenAmount",
        key: "childrenAmount",
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (_, { status }) => (
            <span
                className={`px-2 py-1 text-xs rounded-full ${
                    status === "Chờ xử lý"
                        ? "bg-[#FFC522] text-white"
                        : status === "Đã chấp thuận"
                        ? "bg-[#8BC24A] text-white"
                        : status === "Đã hủy"
                        ? "bg-[#F01B23] text-white"
                        : ""
                }`}
            >
                {status}
            </span>
        ),
    },
    {
        title: "Hành động",
        key: "action",
        render: ({ status }) => (
            <>
                {status === "Chờ xử lý" && (
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border-[1.5px] border-[#8BC24A] text-[#8bc24a] rounded-md">
                            Chấp thuận
                        </button>
                        <button className="px-3 py-1 border-[1.5px] border-[#F01B23] text-[#F01B23] rounded-md">
                            Hủy
                        </button>
                    </div>
                )}
            </>
        ),
    },
];

const dataSource = [
    {
        key: "1",
        name: "John Brown",
        phone: "0123456789",
        date: "2022-12-12",
        time: "12:00",
        guest: 2,
        childrenAmount: 0,
        status: "Chờ xử lý",
    },
    {
        key: "2",
        name: "Jim Green",
        phone: "0123456789",
        date: "2022-12-12",
        time: "12:00",
        guest: 2,
        childrenAmount: 0,
        status: "Đã hủy",
    },
    {
        key: "3",
        name: "Joe Black",
        phone: "0123456789",
        date: "2022-12-12",
        time: "12:00",
        guest: 2,
        childrenAmount: 0,
        status: "Đã chấp thuận",
    },
    {
        key: "4",
        name: "Jim Red",
        phone: "0123456789",
        date: "2022-12-12",
        time: "12:00",
        guest: 2,
        childrenAmount: 0,
        status: "Chờ xử lý",
    },
    {
        key: "5",
        name: "John Brown",
        phone: "0123456789",
        date: "2022-12-12",
        time: "12:00",
        guest: 2,
        childrenAmount: 0,
        status: "Chờ xử lý",
    },
    {
        key: "6",
        name: "Jim Green",
        phone: "0123456789",
        date: "2022-12-12",
        time: "12:00",
        guest: 2,
        childrenAmount: 0,
        status: "Chờ xử lý",
    },
    {
        key: "7",
        name: "Joe Black",
        phone: "0123456789",
        date: "2022-12-12",
        time: "12:00",
        guest: 2,
        childrenAmount: 0,
        status: "Chờ xử lý",
    },
];
export default function BookingManagement() {
    const [activeTab, setActiveTab] = useState(0);
    const activeButton =
        "px-3 py-1 text-sm font-medium border-b border-b-2 border-[#F01B23] box-sizing";
    const inactiveButton = "px-3 py-1 text-sm font-medium";
    return (
        <section className="flex justify-center bg-[#EEEEEE] w-full">
            <div className="grid grid-cols-5 gap-4 w-full p-4 max-w-[1280px] min-h-screen">
                <div className="col-span-1 h-auto">
                    <Navigation />
                </div>
                <div className="col-span-4 flex flex-col rounded-md bg-white py-3 px-5">
                    <h1 className="text-lg font-semibold">Quản lý đặt bàn</h1>

                    <nav className="flex gap-3 w-full py-5">
                        <button
                            className={
                                activeTab === 0 ? activeButton : inactiveButton
                            }
                            onClick={() => setActiveTab(0)}
                        >
                            Tất cả
                        </button>
                        <button
                            className={
                                activeTab === 1 ? activeButton : inactiveButton
                            }
                            onClick={() => setActiveTab(1)}
                        >
                            Chờ xử lý
                        </button>
                        <button
                            className={
                                activeTab === 2 ? activeButton : inactiveButton
                            }
                            onClick={() => setActiveTab(2)}
                        >
                            Đã chấp thuận
                        </button>
                        <button
                            className={
                                activeTab === 3 ? activeButton : inactiveButton
                            }
                            onClick={() => setActiveTab(3)}
                        >
                            Đã hủy
                        </button>
                    </nav>

                    <aside className="w-full">
                        <Table dataSource={dataSource} columns={columns} />;
                    </aside>
                </div>
            </div>
        </section>
    );
}
