import { getUsers, updateUserStatus } from "@/apis/adminDashboard";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { Table } from "antd";

const activeButton =
    "px-3 py-1 text-sm font-medium border-b border-b-2 border-[#F01B23] box-sizing";
const inactiveButton = "px-3 py-1 text-sm font-medium";
const statusName = (status) => {
    switch (status) {
        case 0:
            return "Đang hoạt động";
        case 1:
            return "Bị chặn";
        case 2:
            return "Chưa xác nhận";
        default:
            return "";
    }
};
export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    const columns = [
        {
            title: "Họ và tên",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdDate",
            key: "createdDate",
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            render: (_, { role }) => (
                <span
                    // className={`px-2 py-1 text-xs text-center font-semibold rounded-full min-w-24 block ${
                    //     role === 1
                    //         ? "bg-[#FFC522] text-white"
                    //         : role === 2
                    //         ? "bg-[#8BC24A] text-white"
                    //         : ""
                    // }`}
                    className="font-semibold underline"
                >
                    {role === 2 ? "Người dùng" : "Chủ nhà hàng"}
                </span>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (_, { status }) => (
                <span
                    className={`px-2 py-1 text-xs text-center font-semibold rounded-full min-w-24 block ${
                        status === 2
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
                    {record.status === 1 ? (
                        <button
                            className="px-3 py-1 min-w-28 block border-[1.5px] border-[#8BC24A] text-[#8bc24a] rounded-md transition-all hover:bg-[#8bc24a] hover:text-white"
                            onClick={() => handleUpdateStatus(record.id, 0)}
                        >
                            Mở khóa
                        </button>
                    ) : record.status === 0 ? (
                        <button
                            className="px-3 py-1 min-w-28 border-[1.5px] border-[#F01B23] text-[#F01B23] rounded-md transition-all hover:bg-[#F01B23] hover:text-white"
                            onClick={() => handleUpdateStatus(record.id, 1)}
                        >
                            Khóa
                        </button>
                    ) : (
                        <></>
                    )}
                </>
            ),
        },
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data);
            } catch (error) {
                console.error(`Error in users request: ${error.message}`);
            }
        };

        fetchUsers();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            const response = await updateUserStatus(id, status);
            if (response.status === 200) {
                const updateUsers = users.map((user) => {
                    if (user.id === id) {
                        return {
                            ...user,
                            status,
                        };
                    }
                    return user;
                });
                setUsers(updateUsers);
            }
        } catch (error) {
            console.error(
                `Error in handleUpdateStatus request: ${error.message}`
            );
        }
    };

    const filterUsers = async (status) => {
        const response = await getUsers(1, 10, status);
        setUsers(response.data);
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
                    <h1 className="text-lg font-semibold">Quản lý người dùng</h1>
                    <nav className="flex gap-3 w-full py-5">
                        <button
                            className={
                                activeTab === -1 ? activeButton : inactiveButton
                            }
                            onClick={() => filterUsers(-1)}
                        >
                            Tất cả
                        </button>
                        <button
                            className={
                                activeTab === 0 ? activeButton : inactiveButton
                            }
                            onClick={() => filterUsers(0)}
                        >
                            Hoạt động
                        </button>
                        <button
                            className={
                                activeTab === 1 ? activeButton : inactiveButton
                            }
                            onClick={() => filterUsers(1)}
                        >
                            Bị khóa
                        </button>
                        <button
                            className={
                                activeTab === 2 ? activeButton : inactiveButton
                            }
                            onClick={() => filterUsers(2)}
                        >
                            Chưa xác nhận
                        </button>
                    </nav>
                    <aside className="w-full">
                        <Table
                            dataSource={users?.map((restaurant) => ({
                                ...restaurant,
                                createdDate: formatDate(restaurant.createdDate),
                            }))}
                            columns={columns}
                            className="overflow-auto"
                            scroll={{ x: 900 }}
                        />
                    </aside>
                </div>
            </div>
        </section>
    );
}
