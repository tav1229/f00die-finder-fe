import { Search } from "lucide-react";
import { Link } from "react-router-dom";
export default function SignUp() {
    return (
        <section className="w-full flex flex-col items-center justify-center h-auto bg-[#EEEEEE]">
            <div className="w-full flex flex-col py-4 px-7 bg-[#F7F6F4]">
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
            <div className="flex flex-col w-[852px] items-center bg-white mt-2 py-6 shadow">
                <h1 className="text-xl font-medium uppercase text-center mb-6">
                    Đăng ký thành viên F00die Finder
                </h1>
                <form action="" className="flex flex-col w-[600px] gap-5">
                    <input
                        placeholder="Họ và tên"
                        type="text"
                        className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                    />
                    <input
                        placeholder="Số điện thoại"
                        type="text"
                        className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                    />
                    <input
                        placeholder="Email"
                        type="email"
                        className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                    />
                    <input
                        placeholder="Mật khẩu"
                        type="password"
                        className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                    />
                    <input
                        placeholder="Nhập lại mật khẩu"
                        type="password"
                        className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                    />
                    <button
                        type="button"
                        className="bg-[#D02028] text-white font-medium h-10 text-sm mt-5"
                    >
                        Đăng ký
                    </button>
                    <div className="flex gap-1 text-sm font-medium">
                        <p>Đã có tài khoản?</p>
                        <Link to="/sign-in" className="text-[#D02028]">
                            Đăng nhập
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
