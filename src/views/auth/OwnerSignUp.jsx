import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Check, UserRound } from "lucide-react";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { Image, Upload, Button } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getProvinceOrCity, getDistrict } from "@/apis/location";
import AtomDropdown from "@/components/Atoms/AtomDropdown";
import Img from "../../assets/images/bg.png";
import { register } from "../../apis/auth/register";
import { verifyEmail } from "../../apis/auth/verifyEmail";
import { getOtp } from "../../apis/auth/getOtp";
import { useAuthStore } from "../../storages/auth";
import { toast, Bounce } from "react-toastify";
import { Modal } from "antd";

export default function OwnerSignUp() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [imageUrl, setImageUrl] = useState(Img);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantPhone, setRestaurantPhone] = useState("");
    const [provinceOrCity, setProvinceOrCity] = useState("");
    const [district, setDistrict] = useState("");
    const [otp, setOtp] = useState("");

    const [provinceOrCitys, setProvinceOrCitys] = useState([]);
    const [districts, setDistricts] = useState([]);

    const { isExpired, setIsExpired } = useAuthStore();
    const [tempToken, setTempToken] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchProvinceOrCitys = async () => {
            try {
                const response = await getProvinceOrCity();
                setProvinceOrCitys([
                    {
                        id: "",
                        name: "Tỉnh/Thành phố",
                    },
                    ...response.data,
                ]);
                setProvinceOrCity("");
            } catch (error) {
                console.error(
                    `Error in fetchProvinceOrCitys request: ${error.message}`
                );
            }
        };

        fetchProvinceOrCitys();
    }, []);

    useEffect(() => {
        const fetchDistricts = async (provinceOrCityId) => {
            setDistricts([
                {
                    id: "",
                    name: "Quận/Huyện",
                },
            ]);
            try {
                const response = await getDistrict(provinceOrCityId);
                setDistricts([
                    {
                        id: "",
                        name: "Quận/Huyện",
                    },
                    ...response.data,
                ]);
                setDistrict("");
            } catch (error) {
                console.error(
                    `Error in fetchDistricts request: ${error.message}`
                );
            }
        };

        fetchDistricts(provinceOrCity);
    }, [provinceOrCity]);

    const showModal = () => {
        setOpen(true);
    };

    const handleUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.error) {
                console.error(
                    "An error occurred while reading the file:",
                    reader.error
                );
            } else {
                setImageUrl(reader.result);
            }
        };
        reader.readAsDataURL(file);
        return false;
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const dataSend = {
            email: email,
            password: password,
            fullName: fullName,
            phoneNumber: phoneNumber,
            role: 1,
        };
        const res = await register(dataSend);
        // setIsLoading(false);
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
            navigate("/owner");
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
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <section className="w-full flex flex-col items-center justify-center h-auto bg-[#EEEEEE]">
            <div className="grid grid-cols-12 w-[962px] mt-5">
                <div className="col-span-5 w-full bg-[#d02028]">
                    <img
                        src="http://epicurevietnam.com/Data/Sites/1/media/dining/saigon/25/2.jpg"
                        alt=""
                        className="h-full object-cover"
                    />
                </div>

                <div className="flex col-span-7 flex-col  items-center bg-white py-6 shadow">
                    <h1 className="text-base font-medium uppercase text-center mb-6">
                        Đăng ký thành viên F00die Finder
                    </h1>
                    {/* <div className="flex items-center justify-center gap-2 w-full text-sm pb-4">
                        {step === 0 && (
                            <div className="rounded-full flex items-center text-base justify-center w-9 h-9 bg-[#d02028] text-white">
                                <UserRound className="w-5 h-5" />
                            </div>
                        )}
                        {step >= 1 && (
                            <div className="rounded-full flex items-center text-base justify-center w-9 h-9 bg-white shadow-[0_0_5px_rgba(208,23,40,0.4)]">
                                <Check className="w-5 h-5 text-[#d02028]" />
                            </div>
                        )}
                        <span className="font-medium">Tài khoản</span>
                        <div
                            className={`w-1/4 border ${
                                step === 0
                                    ? "border-gray-300"
                                    : "border-[#d02028]"
                            }`}
                        ></div>
                        {step === 0 && (
                            <div className="rounded-full flex items-center text-base justify-center w-9 h-9 bg-[#F0F0F0] text-gray-400 ">
                                <MdOutlineTableRestaurant className="w-5 h-5" />
                            </div>
                        )}
                        {step >= 1 && (
                            <div className="rounded-full flex items-center text-base justify-center w-9 h-9 bg-[#d02028] text-white">
                                <MdOutlineTableRestaurant className="w-5 h-5" />
                            </div>
                        )}
                        <span className="font-medium">Nhà hàng</span>
                    </div> */}
                    {step === 0 && (
                        <form
                            onSubmit={handleOnSubmit}
                            className="flex flex-col gap-5 px-5 w-full"
                        >
                            <input
                                placeholder="Họ và tên"
                                type="text"
                                required
                                className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <input
                                placeholder="Số điện thoại"
                                type="text"
                                pattern="^0\d{9}$"
                                title="Số điện thoại phải bắt đầu bằng số 0 và có đủ 10 chữ số"
                                className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                                required
                                onChange={(e) => setPhoneNumber(e.target.value)}
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
                                onChange={(e) => setRePassword(e.target.value)}
                            />
                            {/* <button
                                type="button"
                                className="bg-[#D02028] text-white font-medium h-10 text-sm mt-5"
                                onClick={() => setStep(step + 1)}
                            >
                                Tiếp theo
                            </button> */}
                            <button
                                type="submit"
                                className="bg-[#D02028] text-white font-medium h-10 text-sm mt-5"
                            // onClick={handleOnSubmit}
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
                    )}
                    {/* {step > 0 && (
                        <form
                            onSubmit={handleOnSubmit}
                            className="flex flex-col gap-5 px-5 w-full"
                        >
                            <div className="flex items-center gap-10">
                                <Image
                                    width="100px"
                                    height="60px"
                                    className="object-cover"
                                    src={imageUrl}
                                />
                                <div className="flex flex-col gap-1">
                                    <Upload
                                        accept="image/*"
                                        beforeUpload={handleUpload}
                                        showUploadList={false}
                                    >
                                        <button className="px-4 py-2 border border-gray-300 hover:text-[#d02028] hover:border-[#d02028]">
                                            Cập nhật Logo nhà hàng
                                        </button>
                                    </Upload>
                                    <p className="text-[10px]">
                                        Dạng file .jpg, .jpeg, .png, kích thước
                                        tối ưu 100x60 pixel.
                                    </p>
                                </div>
                            </div>
                            <input
                                placeholder="Tên nhà hàng"
                                type="text"
                                className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                            />
                            <input
                                placeholder="Số điện thoại nhà hàng"
                                type="text"
                                className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <AtomDropdown
                                    label="Tỉnh/Thành phố"
                                    options={provinceOrCitys}
                                    value={provinceOrCity}
                                    className="w-full"
                                    onChange={(value) => setProvinceOrCity(value)}
                                />
                                <AtomDropdown
                                    label="Quận/Huyện"
                                    options={districts}
                                    value={district}
                                    className="w-full"
                                    onChange={(value) => setDistrict(value)}
                                />
                            </div>
                            <input
                                placeholder="Địa chỉ"
                                type="text"
                                className=" border border-[#CCCCCC] h-10 outline-none text-gray-700 font-medium text-sm block w-full px-3"
                            />
                            <button
                                type="submit"
                                className="bg-[#D02028] text-white font-medium h-10 text-sm mt-5"
                                onClick={() => navigate("/owner")}
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
                    )} */}
                </div>
            </div>
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
                    <p className="text-sm mt-4">
                        Vui lòng nhập mã xác thực được gửi trong email mà bạn
                        vừa đăng ký
                    </p>
                </form>
            </Modal>
        </section>
    );
}
