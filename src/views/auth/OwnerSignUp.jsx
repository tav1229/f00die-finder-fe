import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Check, UserRound } from "lucide-react";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { Image, Upload, Button } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Img from "../../assets/images/bg.png";

export default function OwnerSignUp() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [imageUrl, setImageUrl] = useState(Img);

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

        // Prevent upload
        return false;
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
                    <div className="flex items-center justify-center gap-2 w-full text-sm pb-4">
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
                    </div>
                    {step === 0 && (
                        <form
                            action=""
                            className="flex flex-col gap-5 px-5 w-full"
                        >
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
                                onClick={() => setStep(step + 1)}
                            >
                                Tiếp theo
                            </button>
                            <div className="flex gap-1 text-sm font-medium">
                                <p>Đã có tài khoản?</p>
                                <Link to="/sign-in" className="text-[#D02028]">
                                    Đăng nhập
                                </Link>
                            </div>
                        </form>
                    )}
                    {step > 0 && (
                        <form
                            action=""
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
                                onClick={() => navigate('/owner')}
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
                </div>
            </div>
        </section>
    );
}
