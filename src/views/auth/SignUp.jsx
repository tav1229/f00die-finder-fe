import { Search, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { register } from "../../apis/auth/register";
import { verifyEmail } from "../../apis/auth/verifyEmail";
import { useAuthStore } from "../../storages/auth";
import { toast, Bounce } from "react-toastify";
import { getOtp } from "../../apis/auth/getOtp";

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [open, setOpen] = useState(false);
    const { isExpired, setIsExpired } = useAuthStore();
    const [tempToken, setTempToken] = useState("");

    const navigate = useNavigate();

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setOpen(false)
    }

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        const response = await verifyEmail(otp, tempToken);
        if (response) {
            setIsExpired(false);
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
            toast.success("Đăng ký thành công", {
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
            navigate("/");
        } else {
            toast.error("Mã OTP không chính xác", {
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
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const dataSend = {
            email: email,
            password: password,
            fullName: name,
            phoneNumber: phone,
            role: 2,
        };
        const res = await register(dataSend);
        setIsLoading(false);
        if (res) {
            getOtp(email, 1);
            setTempToken(res.accessToken);
            showModal();
        } else {
            toast.error("Email đã được đăng ký", {
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
                <form
                    onSubmit={handleSignUp}
                    className="flex flex-col w-[600px] gap-5"
                >
                    <input
                        placeholder="Họ và tên"
                        type="text"
                        className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        placeholder="Số điện thoại"
                        type="text"
                        className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        placeholder="Email"
                        type="email"
                        className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Mật khẩu"
                        type="password"
                        className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        placeholder="Nhập lại mật khẩu"
                        type="password"
                        className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {isLoading ? (
                        <button
                            type="button"
                            className="bg-[#D02028] text-white font-medium h-10 contrast-75 flex items-center justify-center gap-1 text-sm mt-8"
                            disabled
                        >
                            <LoaderCircle className="animate-spin w-5 h-5 " />{" "}
                            Đang tải...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-[#D02028] text-white font-medium h-10 text-sm mt-8"
                        >
                            Đăng ký
                        </button>
                    )}
                    <div className="flex gap-1 text-sm font-medium">
                        <p>Đã có tài khoản?</p>
                        <Link to="/sign-in" className="text-[#D02028]">
                            Đăng nhập
                        </Link>
                    </div>
                </form>
                    <Modal
                        open={open}
                        title="Xác thực OTP"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <form onSubmit={handleVerifyEmail} className="py-4">
                            <input
                                placeholder="Nhập mã OTP"
                                type="text"
                                className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                                required
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-[#D02028] text-white font-medium h-10 w-full text-sm mt-4"
                            >
                                Xác thực
                            </button>
                            <p className="text-sm mt-4">Vui lòng nhập mã xác thực được gửi trong email mà bạn vừa đăng ký</p>
                        </form>
                    </Modal>
            </div>
        </section>
    );
}
