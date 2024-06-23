import { Search, LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../apis/auth/login";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
import { useAuthStore } from "../../storages/auth";
import { checkExpiration } from "../../utils/checkExpiration";

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isExpired, setIsExpired } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
        };
        setIsLoading(true);
        const response = await login(data);
        if (!response.status) {
            console.log("response", response)
            localStorage.setItem("access-token", response.accessToken);
            localStorage.setItem(
                "accessTokenExpiryTime",
                response.accessTokenExpiryTime
            );
            localStorage.setItem("refresh-token", response.refreshToken);
            localStorage.setItem(
                "refreshTokenExpiryTime",
                response.refreshTokenExpiryTime
            );
            localStorage.setItem("role", JSON.stringify(response.role));
            const isExpired = checkExpiration();
            setIsExpired(isExpired);
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
            toast.error(response.message, {
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
        setIsLoading(false);
    };

    return (
        <section className="w-full flex flex-col items-center justify-start h-auto min-h-screen bg-[#EEEEEE]">
            <div className="flex flex-col w-[852px] items-center bg-white mt-10 py-6 shadow">
                <h1 className="text-xl font-medium uppercase text-center mb-6">
                    Đăng nhập thành viên F00die Finder
                </h1>
                <form className="flex flex-col w-[600px] gap-2" onSubmit={handleLogin}>
                    <input
                        placeholder="Email"
                        type="email"
                        required
                        className=" border border-[#CCCCCC] h-14 outline-none text-gray-700 font-medium text-sm block w-full px-5"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Mật khẩu"
                        type="password"
                        required
                        className=" border border-[#CCCCCC] h-14 outline-none text-gray-700 font-medium text-sm block w-full px-5 mt-3"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {
                        isLoading ? (
                            <button
                                type="button"
                                className="bg-[#D02028] text-white font-medium h-10 contrast-75 flex items-center justify-center gap-1 text-sm mt-8"
                                disabled
                            >
                                <LoaderCircle className="animate-spin w-5 h-5 "/> Đang tải...
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-[#D02028] text-white font-medium h-10 text-sm mt-8"
                            >
                                Đăng nhập
                            </button>
                        )
                    }
                    <Link className="font-medium text-sm hover:underline">
                        Quên mật khẩu?
                    </Link>
                    <div className="flex gap-1 text-sm justify-center font-medium">
                        <p>Chưa có tài khoản?</p>
                        <Link
                            to="/sign-up"
                            className="text-[#D02028] hover:underline font-bold"
                        >
                            Đăng ký
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
