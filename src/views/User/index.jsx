import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import UserNavigation from "./UserNavigation";
import { useState, useEffect } from "react";
import { getMyInfo, updateMyInfo } from "../../apis/user";
import { toast, Bounce } from "react-toastify";

export default function User() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const response = await getMyInfo();
                setName(response.fullName);
                setPhone(response.phoneNumber);
                setEmail(response.email);
            } catch (error) {
                console.error(`Error in fetchMyInfo request: ${error.message}`);
            }
        };

        fetchMyInfo();
    }, []);

    const handleUpdateMyInfo = async (event) => {
        event.preventDefault();
        try {
            await updateMyInfo({ fullName: name, phoneNumber: phone, email: email});
            toast.success("Cập nhật thông tin thành công", {
                position: "top-center",
                autoClose: 1998,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            toast.error("Cập nhật thông tin thất bại", {
                position: "top-center",
                autoClose: 1998,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    return (
        <section className="w-full flex flex-col items-center justify-start h-auto min-h-screen bg-[#EEEEEE]">
            {/* <div className="w-full flex flex-col py-4 px-7 bg-[#F7F6F4]">
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
            </div> */}

            <div className="w-full max-w-[1280px] flex flex-col px-12">
                <div className="text-sm flex gap-1 w-full items-center h-16 px-2">
                    <Link
                        to="/"
                        className="text-[#333333] font-medium hover:text-[#D02028]"
                    >
                        Trang chủ
                    </Link>{" "}
                    {">"}{" "}
                    <p className="font-bold text-[#D02028]">
                        Thông tin tài khoản
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <UserNavigation />
                    <div className="col-span-2 flex flex-col bg-white p-6">
                        <h1 className="text-xl font-medium uppercase text-center mb-6">
                            Thông tin tài khoản
                        </h1>
                        <form onSubmit={handleUpdateMyInfo} className="flex flex-col gap-2">
                            <div className="flex items-center">
                                <label
                                    htmlFor="name"
                                    className="min-w-[110px] font-medium text-sm"
                                >
                                    Tên:
                                </label>
                                <input
                                    placeholder="Họ và tên"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-5 max-w-[340px]"
                                />
                            </div>
                            <div className="flex items-center">
                                <label
                                    htmlFor="email"
                                    className="min-w-[110px] font-medium text-sm"
                                >
                                    Email:
                                </label>
                                <input
                                    placeholder="Email"
                                    type="text"
                                    required
                                    disabled
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                    className="border border-[#CCCCCC] h-10 bg-gray-100 outline-none text-gray-400 font-medium text-sm block w-full px-5 max-w-[340px]"
                                />
                            </div>
                            <div className="flex items-center">
                                <label
                                    htmlFor="phone"
                                    className="min-w-[110px] font-medium text-sm"
                                >
                                    Số điện thoại:
                                </label>
                                <input
                                    placeholder="Số điện thoại"
                                    type="text"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-5 max-w-[340px]"
                                />
                            </div>

                            <div className="w-full mt-2 flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-[#D02028] text-white font-medium h-10 w-40 rounded-md text-sm "
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
