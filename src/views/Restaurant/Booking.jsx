import { Search, ListFilter } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useBookingStore } from "../../storages/booking";
import { getRestaurant } from "../../apis/restaurant";
import { createRevervation } from "../../apis/reservation";
import { checkExpiration } from "../../utils/checkExpiration";
import ModalAlert from "../../components/ModalAlert";
import BookingForm from "../../components/BookingForm";
import ModalBookingDetail from "../../components/ModalBookingDetail";

export default function Booking() {
    // const { booking, setBooking } = useBookingStore();
    const ref = useRef(null)
    const navigate = useNavigate();
    const [booking, setBooking] = useState({
        numberOfAdults: 0,
        numberOfChildren: 0,
        time: new Date(),
    });
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");
    const { id } = useParams();
    const [timeFormatted, setTimeFormatted] = useState("");
    const [restaurant, setRestaurant] = useState({});
    const [isClickedUpdate, setIsClickedUpdate] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    
    const [bookingDetail, setBookingDetail] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertContent, setAlertContent] = useState({
        title: "",
        content: "",
        status: "",
    });

    const daysOfWeek = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
    ];

    useEffect(() => {
        const bookingData = JSON.parse(localStorage.getItem("booking"));
        const dateTime = new Date(
            `${bookingData?.date}T${bookingData?.time}:00.626Z`
        );
        const isoString = dateTime.toISOString();
        setTimeFormatted(isoString);

        if (bookingData) {
            setBooking(bookingData);
        }

        ref.current.scrollIntoView({ behavior: "smooth", block: 'center' });

    }, []);

    useEffect(() => {
        getRestaurant(id).then((response) => {
            setRestaurant(response);
        });
    }, [id]);

    const handleClickNext = (e) => {
        e.preventDefault();
        setBookingDetail({
            ...booking,
            restaurantId: id,
            customerName: name,
            customerPhone: phone,
            email: email,
            note: note,
        });
        setIsConfirm(true);
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("access-token");
        if (checkExpiration()) {
            setIsModalOpen(true);
            setAlertContent({
                title: "Hết phiên đăng nhập",
                content: "Vui lòng đăng nhập để đặt chỗ",
                status: "warning",
            });
            return;
        }
        if (!token) {
            setIsModalOpen(true);
            setAlertContent({
                title: "Vui lòng đăng nhập",
                content: "Vui lòng đăng nhập để đặt chỗ",
                status: "warning",
            });
            return;
        }
        const dataSend = {
            ...booking,
            restaurantId: id,
            customerName: name,
            customerPhone: phone,
            customerEmail: email,
            note: note,
        };
        const response = await createRevervation(dataSend);
        if (response.data) {
            setIsModalOpen(true);
            setAlertContent({
                title: "Đặt chỗ thành công",
                content:
                    "Bạn đã đặt chỗ thành công. Vui lòng chờ nhân viên xác nhận!",
                status: "success",
            });
        } else {
            setIsModalOpen(true);
            setAlertContent({
                title: "Đặt chỗ thất bại",
                content: "Vui lòng thử lại sau!",
                status: "error",
            });
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        if (alertContent.status === "success") {
            navigate("/user/booking-history");
        }
    };

    function formatDate(isoString) {
        const date = new Date(isoString);

        const dayName = daysOfWeek[date.getUTCDay()];
        const day = date.getUTCDate().toString().padStart(2, "0");
        const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
        const year = date.getUTCFullYear();
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");

        return `${dayName}, ngày ${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const handleClickBooking = (booking) => {
        const dateTime = new Date(
            `${booking?.date}T${booking?.time}:00.626Z`
        );
        const isoString = dateTime.toISOString();
        setTimeFormatted(isoString);
        setIsClickedUpdate(false);
        setBooking(booking);
    };

    return (
        <section className="w-full flex justify-center h-auto bg-[#EEEEEE]">
            <div className="flex flex-col w-full max-w-[1280px] bg-[#EEEEEE]">
                {/* <div className="w-full flex flex-col py-4 px-7">
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

                <div className="flex flex-col gap-4 px-7 py-5 bg-[#F2F2F7]">
                    <div ref={ref} className="flex w-full uppercase bg-white rounded-lg text-xl font-medium text-[#333333] p-5">
                        Đặt chỗ đến "{restaurant?.name}"
                    </div>
                    <form
                        className="grid grid-cols-3 gap-4"
                        onSubmit={handleClickNext}
                    >
                        <div className="col-span-2 flex flex-col gap-3 bg-white rounded-lg p-5">
                            <div className="py-2">
                                <h1 className="text-base font-medium">
                                    Thông tin người đặt
                                </h1>
                            </div>
                            <div className="flex flex-col gap-1 py-1">
                                <label
                                    htmlFor="name"
                                    className="text-sm text-[#333333] font-medium"
                                >
                                    Tên liên lạc{" "}
                                    <span className="text-[#d02028]">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="border border-[#CCCCCC] h-[34px] outline-none text-[#555555] text-sm rounded-sm block w-full p-2"
                                    placeholder="Nhập tên liên lạc"
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2 py-1">
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="phone"
                                        className="text-sm text-[#333333] font-medium"
                                    >
                                        Số điện thoại{" "}
                                        <span className="text-[#d02028]">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        required
                                        className="border border-[#CCCCCC] h-[34px] outline-none text-[#555555] text-sm rounded-sm block w-full p-2"
                                        placeholder="Nhập số điện thoại"
                                        onChange={(event) =>
                                            setPhone(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="email"
                                        className="text-sm text-[#333333] font-medium"
                                    >
                                        Email{" "}
                                        <span className="text-[#d02028]">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="border border-[#CCCCCC] h-[34px] outline-none text-[#555555] text-sm rounded-sm block w-full p-2"
                                        placeholder="Nhập email"
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 py-1">
                                <label
                                    htmlFor="note"
                                    className=" text-[#333333] font-semibold"
                                >
                                    Ghi chú
                                </label>
                                <textarea
                                    id="note"
                                    rows={2}
                                    className="border border-[#CCCCCC] outline-none text-[#555555] text-sm rounded-sm block w-full p-2"
                                    placeholder="Nhập ghi chú"
                                    onChange={(event) =>
                                        setNote(event.target.value)
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                className="h-10 flex items-center justify-center w-[200px] text-lg bg-[#d02028] text-white font-medium rounded-md"
                            >
                                Tiếp tục
                            </button>
                            <span className="text-sm text-[#808080] font-medium mb-4">
                                Khi lựa chọn “Tiếp tục” bạn đã công nhận mình đã
                                đọc và đồng ý với các Điều khoản sử dụng và
                                chính sách quyền riêng tư của F00die Finder.
                            </span>
                        </div>

                        <div className="col-span-1 bg-white rounded-lg h-fit">
                            <div className="flex flex-col p-4">
                                <div className="flex items-center justify-around py-2 border-b">
                                    <h2 className="text-base font-medium pr-8">
                                        Thông tin đặt chỗ
                                    </h2>
                                    <button
                                        className="h-9 flex items-center justify-center text-sm px-3 bg-[#d02028] text-white font-medium rounded-md"
                                        type="button"
                                        onClick={() =>
                                            setIsClickedUpdate(!isClickedUpdate)
                                        }
                                    >
                                        {isClickedUpdate ? "Quay lại" : "Chỉnh Sửa"}
                                    </button>
                                </div>
                                {isClickedUpdate ? (
                                    <BookingForm
                                        id={id}
                                        booking={booking}
                                        onBooking={handleClickBooking}
                                    />
                                ) : (
                                    <div className="px-4 py-5 gap-5 flex flex-col">
                                        <span className="text-sm pb-5 font-medium border-b">
                                            {restaurant?.name}
                                        </span>
                                        <span className="text-sm pb-5 font-medium border-b">
                                            {booking?.numberOfAdults ?? 0} người
                                            lớn,{" "}
                                            {booking?.numberOfChildren ?? 0} trẻ
                                            em
                                        </span>
                                        <span className="text-sm pb-5 font-medium border-b">
                                            {timeFormatted &&
                                                formatDate(timeFormatted)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ModalAlert
                isModalOpen={isModalOpen}
                alertContent={alertContent}
                handleCancel={handleCancel}
            />
            <ModalBookingDetail
                isModalOpen={isConfirm}
                bookingDetail={bookingDetail}
                handleCancel={() => setIsConfirm(false)}
                handleSubmit={handleOnSubmit}
            />
        </section>
    );
}
