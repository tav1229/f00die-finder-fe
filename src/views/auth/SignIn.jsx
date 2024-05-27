import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../apis/auth/login";
import { useState, useEffect, Bounce } from "react";
import { toast } from "react-toastify";
export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const data = {
            email: email,
            password: password,
        };
        const response = await login(data);
        if (response) {
            localStorage.setItem("access-token", response.accessToken);
            localStorage.setItem("refresh-token", response.refreshToken);
            localStorage.setItem("role", JSON.stringify(response.role));
            toast.success("Đăng nhập thành công", {
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
            switch (response.role) {
                case 0: 
                    navigate("/admin");
                    break;
                case 1:
                    navigate("/owner");
                    break;
                case 2:
                    navigate("/");
                    break;
                default:
                    navigate("/sign-in");
            }
        } else {
            toast.error("Sai tài khoản hoặc mật khẩu", {
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
    };

    return (
        <section className="w-full flex flex-col items-center justify-start h-auto min-h-screen bg-[#EEEEEE]">
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
            <div className="flex flex-col w-[852px] items-center bg-white mt-10 py-6 shadow">
                <h1 className="text-xl font-medium uppercase text-center mb-6">
                    Đăng nhập thành viên F00die Finder
                </h1>
                <form className="flex flex-col w-[600px] gap-2">
                    <input
                        placeholder="Email"
                        type="email"
                        className=" border border-[#CCCCCC] h-14 outline-none text-gray-700 font-medium text-sm block w-full px-5"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Mật khẩu"
                        type="password"
                        className=" border border-[#CCCCCC] h-14 outline-none text-gray-700 font-medium text-sm block w-full px-5 mt-3"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        className="bg-[#D02028] text-white font-medium h-10 text-sm mt-8"
                        onClick={handleLogin}
                    >
                        Đăng nhập
                    </button>
                    <Link className="font-medium text-sm hover:underline">
                        Quên mật khẩu?
                    </Link>
                    <div className="flex gap-1 text-sm justify-center font-medium">
                        <p>Chưa có tài khoản?</p>
                        <Link
                            to="/sign-up"
                            className="text-[#D02028] hover:underline"
                        >
                            Đăng ký
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
