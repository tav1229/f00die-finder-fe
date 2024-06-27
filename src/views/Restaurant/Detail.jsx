import { UsersRound, Check, CircleDollarSign } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
    getRestaurant,
    saveRestaurant,
    unsaveRestaurant,
} from "../../apis/restaurant";
import { Image } from "antd";
import { useBookingStore } from "@/storages/booking";
import DOMPurify from "dompurify";
import { Rating, Textarea } from "@mantine/core";
import { MapPin, Flag, Clock, Star, Heart } from "lucide-react";
import { Carousel, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import BookingForm from "@/components/BookingForm";
import { FaHeart } from "react-icons/fa6";
import {
    getReviewComments,
    createReviewComment,
} from "../../apis/reviewComment";
import ModalAlert from "@/components/ModalAlert";
import { Skeleton } from "@mantine/core";

const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
];
function formatDate(isoString) {
    const date = new Date(isoString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}
export default function Detail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { booking, setBooking } = useBookingStore();
    const inputRef = useRef(null);

    const [restaurant, setRestaurant] = useState({});
    const [ratingValue, setRatingValue] = useState(5);
    const [comment, setComment] = useState("");
    const [isCommented, setIsCommented] = useState(false);
    const [reviewComments, setReviewComments] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertContent, setAlertContent] = useState({});

    const [isFavorite, setIsFavorite] = useState(false);

    const timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const timeString = `${hour.toString().padStart(2, "0")}:${minute
                .toString()
                .padStart(2, "0")}`;
            timeOptions.push({ id: timeString, name: timeString });
        }
    }

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const data = await getRestaurant(id);
                setRestaurant(data);
            } catch (error) {
                console.error(
                    `Error in fetchRestaurant request: ${error.message}`
                );
            }
        };

        const fetchReviewComments = async () => {
            try {
                const response = await getReviewComments(id);
                setReviewComments(response.data);
            } catch (error) {
                console.error(
                    `Error in fetchReviewComments request: ${error.message}`
                );
            }
        };

        inputRef.current.scrollIntoView({ behavior: "smooth" });

        fetchReviewComments();
        fetchRestaurant();
    }, []);

    useEffect(() => {
        const ids_saved = localStorage.getItem("ids_saved");

        if (ids_saved) {
            console.log("ids_saved:", ids_saved);
            const parsed_ids_saved = JSON.parse(ids_saved);
            if (parsed_ids_saved.includes(id)) {
                setIsFavorite(true);
            }
        }
    }, []);

    function formatTime(time) {
        return time.slice(0, 5);
    }

    function getCurrentDay() {
        const date = new Date();
        return date.getDay();
    }

    const handleRatingChange = (value) => {
        setRatingValue(value);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCreateReviewComment = async () => {
        if (isCommented) {
            toast.error("Bạn đã đánh giá rồi", {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
        if (!comment) {
            toast.error("Vui lòng nhập nội dung đánh giá", {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
        try {
            const response = await createReviewComment({
                restaurantId: id,
                rating: ratingValue,
                content: comment,
            });
            if (response.status !== 200) {
                setAlertContent({
                    status: "warning",
                    title: "Thông báo",
                    content: "Vui lòng đăng nhập để đánh giá",
                });
                setIsModalOpen(true);
                return;
            }
            setIsCommented(true);
            setReviewComments([response.data, ...reviewComments]);
            toast.success("Đánh giá của bạn đã được gửi thành công!", {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            console.log("Create review comment response:", response);
        } catch (error) {
            console.error("Error creating review comment:", error);
        }
    };

    function checkIfOpen(businessHours) {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const currentTime = now.toTimeString().slice(0, 5);
        if (!businessHours) {
            return {
                status: "CLOSED",
                text: "Đóng cửa",
            };
        }
        const todayHours = businessHours.find(
            (day) => day.dayOfWeek === dayOfWeek
        );

        if (todayHours) {
            const { openTime, closeTime } = todayHours;
            const openingTime = new Date(now.toDateString() + " " + openTime);
            const closingTime = new Date(now.toDateString() + " " + closeTime);
            const thirtyMinutesBeforeClose = new Date(closingTime - 30 * 60000);

            if (currentTime >= openTime && currentTime <= closeTime) {
                return {
                    status: "OPEN",
                    text: `Đang mở cửa: ${openTime.slice(
                        0,
                        5
                    )} - ${closeTime.slice(0, 5)}`,
                };
            } else if (now < openingTime) {
                return {
                    status: "SOON_OPEN",
                    text: `Sắp mở cửa: ${openTime.slice(0, 5)}`,
                };
            } else if (now >= thirtyMinutesBeforeClose && now < closingTime) {
                return {
                    status: "SOON_CLOSE",
                    text: `Sắp đóng cửa: ${closeTime.slice(0, 5)}`,
                };
            }
        }
        return {
            status: "CLOSED",
            text: "Đóng cửa",
        };
    }

    const handleClickBooking = (booking) => {
        setBooking(booking);
        localStorage.setItem("booking", JSON.stringify(booking));
        navigate(`/restaurant/${id}/booking`);
    };

    const handleClickFavorite = async () => {
        if (isFavorite) {
            try {
                const response = await unsaveRestaurant(id);
                if (response.status != 200) {
                    setIsModalOpen(true);
                    setAlertContent({
                        status: "warning",
                        title: "Thông báo",
                        content: "Vui lòng đăng nhập để lưu nhà hàng",
                    });
                    return;
                }
                setIsFavorite(!isFavorite);
                const ids_saved = JSON.parse(localStorage.getItem("ids_saved"));
                const index = ids_saved.indexOf(id);
                if (index > -1) {
                    ids_saved.splice(index, 1);
                }
                localStorage.setItem("ids_saved", JSON.stringify(ids_saved));
            } catch (error) {
                console.error("Error unsaving restaurant:", error);
            }
        } else {
            try {
                const response = await saveRestaurant(id);
                if (response.status != 200) {
                    setIsModalOpen(true);
                    setAlertContent({
                        status: "warning",
                        title: "Thông báo",
                        content: "Vui lòng đăng nhập để lưu nhà hàng",
                    });
                    return;
                }
                setIsFavorite(!isFavorite);
                const ids_saved = JSON.parse(localStorage.getItem("ids_saved"));
                if (ids_saved) {
                    ids_saved.push(id);
                    localStorage.setItem(
                        "ids_saved",
                        JSON.stringify(ids_saved)
                    );
                } else {
                    localStorage.setItem("ids_saved", JSON.stringify([id]));
                }
            } catch (error) {
                console.error("Error saving restaurant:", error);
            }
        }
    };
    return (
        <section
            className="w-full flex justify-center h-auto bg-[#EEEEEE]"
            ref={inputRef}
        >
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

                <div className="w-full flex flex-col justify-center px-10 items-center ">
                    <div className="w-full max-w-[1208px] flex flex-col gap-5">
                        <div className="grid grid-cols-3 gap-4 ">
                            <div className="col-span-2 rounded-lg overflow-hidden">
                                <Carousel autoplay arrows>
                                    {restaurant?.restaurantImages?.map(
                                        (item, index) => (
                                            <img
                                                key={index}
                                                src={item.url}
                                                alt=""
                                                className="w-full h-[364px] object-cover rounded-lg"
                                            />
                                        )
                                    )}
                                </Carousel>
                            </div>
                            <div>
                                <div className="grid grid-cols-2 gap-2 h-auto">
                                    <Image.PreviewGroup
                                        preview={{
                                            onChange: (current, prev) =>
                                                console.log(
                                                    `current index: ${current}, prev index: ${prev}`
                                                ),
                                        }}
                                    >
                                        {restaurant?.restaurantImages?.map(
                                            (item, index) => (
                                                <Image
                                                    key={index}
                                                    src={item.url}
                                                    height={115}
                                                    className="object-cover rounded-sm"
                                                    // className="w-full h-[115px] object-cover rounded-sm"
                                                />
                                            )
                                        )}
                                    </Image.PreviewGroup>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 ">
                            <div className="col-span-2 px-4 py-2 bg-white flex flex-col gap-2 rounded-md">
                                <div className="w-full flex justify-between">
                                    {restaurant?.name ? (
                                        <h1 className="py-1 text-[28px] font-bold">
                                            {restaurant?.name}
                                        </h1>
                                    ) : (
                                        <Skeleton height={30} width={250} />
                                    )}
                                    <Tooltip
                                        title={
                                            isFavorite
                                                ? "Bỏ yêu thích"
                                                : "Yêu thích"
                                        }
                                    >
                                        <button
                                            className="flex items-center justify-center h-12"
                                            onClick={handleClickFavorite}
                                        >
                                            {isFavorite ? (
                                                <FaHeart className="w-7 h-7 text-red-500" />
                                            ) : (
                                                <Heart className="w-7 h-7 text-gray-500" />
                                            )}
                                        </button>
                                    </Tooltip>
                                </div>
                                <div className="flex items-center gap-3 text-gray-800">
                                    <MapPin className="w-5 h-5" />
                                    {restaurant?.location ? (
                                        <span className="font-medium">
                                            {restaurant?.location?.address},{" "}
                                            {restaurant?.wardOrCommune?.name},{" "}
                                            {restaurant?.district?.name} ,{" "}
                                            {restaurant?.provinceOrCity?.name}
                                        </span>
                                    ) : (
                                        <Skeleton height={20} width={300} />
                                    )}
                                    {/* <span className="font-medium">
                                        {restaurant?.location?.address},{" "}
                                        {restaurant?.wardOrCommune?.name},{" "}
                                        {restaurant?.district?.name} ,{" "}
                                        {restaurant?.provinceOrCity?.name}
                                    </span> */}
                                </div>
                                <div className="flex items-center gap-3 text-gray-800">
                                    <Flag className="w-5 h-5" />
                                    <span className="font-medium">
                                        Loại hình:
                                    </span>
                                    {restaurant?.cuisineTypes ? (
                                        <span className="text-[#D02028] font-medium">
                                            {restaurant?.cuisineTypes
                                                ?.map(
                                                    (item, index) => item.name
                                                )
                                                .join(", ")}
                                        </span>
                                    ) : (
                                        <Skeleton height={20} width={200} />
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-gray-800">
                                    <CircleDollarSign className="w-5 h-5" />
                                    <span className="font-medium">
                                        Khoảng giá:
                                    </span>
                                    {restaurant?.priceRangePerPerson ? (
                                        <span className="text-[#D02028] font-medium">
                                            {
                                                restaurant?.priceRangePerPerson
                                                    .name
                                            }
                                        </span>
                                    ) : (
                                        <Skeleton height={20} width={200} />
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-gray-800">
                                    <UsersRound className="w-5 h-5" />
                                    <span className="font-medium">
                                        Kiểu khách hàng:
                                    </span>
                                    {restaurant?.customerTypes ? (
                                        <span className="text-[#D02028] font-medium">
                                            {restaurant?.customerTypes
                                                ?.map(
                                                    (item, index) => item.name
                                                )
                                                .join(", ")}
                                        </span>
                                    ) : (
                                        <Skeleton height={20} width={200} />
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-gray-800">
                                    <Clock className="w-5 h-5" />
                                    {restaurant?.businessHours &&
                                    checkIfOpen(restaurant?.businessHours)
                                        .status === "OPEN" ? (
                                        <span className="text-[#4CAF50] font-medium">
                                            {
                                                checkIfOpen(
                                                    restaurant?.businessHours
                                                ).text
                                            }
                                        </span>
                                    ) : checkIfOpen(restaurant?.businessHours)
                                          .status === "SOON_OPEN" ? (
                                        <span className="text-[#D02028] font-medium">
                                            {
                                                checkIfOpen(
                                                    restaurant?.businessHours
                                                ).text
                                            }
                                        </span>
                                    ) : checkIfOpen(restaurant?.businessHours)
                                          .status === "SOON_CLOSE" ? (
                                        <span className="text-[#FFA500] font-medium">
                                            {
                                                checkIfOpen(
                                                    restaurant?.businessHours
                                                ).text
                                            }
                                        </span>
                                    ) : (
                                        <span className="text-[#D02028] font-medium">
                                            {
                                                checkIfOpen(
                                                    restaurant?.businessHours
                                                ).text
                                            }
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-gray-800">
                                    <Star className="w-5 h-5" />
                                    <Rating
                                        fractions={1}
                                        value={restaurant?.rating}
                                        readOnly
                                    />
                                    <span className="text-xl font-bold text-[#ff9f00]">
                                        {restaurant?.rating}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-1 sticky top-16 px-4 py-2 bg-white flex flex-col items-center gap-2 rounded-md">
                                <h3 className="text-lg flex items-center gap-1 font-medium">
                                    Đặt chỗ{" "}
                                    <p className="text-base text-gray-700 font-medium">
                                        (Để có chỗ trước khi đến)
                                    </p>
                                </h3>
                                <span className="text-[#D02028] font-bold text-sm">
                                    Ưu đãi hấp dẫn
                                </span>
                                <BookingForm
                                    id={id}
                                    onBooking={handleClickBooking}
                                />
                            </div>
                            <div className="col-span-2 px-4 py-2 bg-white flex flex-col gap-2 rounded-md">
                                <h2 className="py-1 text-[20px] font-semibold">
                                    Mô tả
                                </h2>
                                <div
                                    className="text-sm"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            restaurant?.description,
                                            { USE_PROFILES: { html: true } }
                                        ),
                                    }}
                                ></div>
                            </div>
                            <div className="col-span-2 px-4 py-2 bg-white flex flex-col gap-2 rounded-md">
                                <h2 className="py-1 text-[20px] font-semibold">
                                    Menu
                                </h2>
                                <div className="grid grid-cols-3 gap-[10px]">
                                    <Image.PreviewGroup
                                        preview={{
                                            onChange: (current, prev) =>
                                                console.log(
                                                    `current index: ${current}, prev index: ${prev}`
                                                ),
                                        }}
                                    >
                                        {restaurant?.menuImages?.map(
                                            (item, index) => (
                                                <Image
                                                    key={index}
                                                    src={item.url}
                                                    height={235}
                                                    className="object-cover rounded-md"
                                                    // className="w-full h-[235px] object-cover rounded-md"
                                                />
                                            )
                                        )}
                                    </Image.PreviewGroup>
                                </div>
                            </div>
                            <div className="col-span-2 px-4 py-2 bg-white flex flex-col gap-2 rounded-md">
                                <h2 className="py-1 text-[20px] font-semibold">
                                    Tiên ích
                                </h2>
                                <div className="grid grid-cols-2 gap-4 pb-4">
                                    {restaurant?.additionalServices?.map(
                                        (item, index) => {
                                            return (
                                                <div
                                                    className="flex items-center gap-3"
                                                    key={index}
                                                >
                                                    <Check className="w-5 h-5 p-1 bg-[#4CAF50] text-white rounded-full" />
                                                    <span className="text-sm font-medium">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                            <div className="col-span-2 px-4 py-2 bg-white flex flex-col gap-2 rounded-md">
                                <h2 className="py-1 text-[20px] font-semibold">
                                    Giờ hoạt động
                                </h2>

                                <div className="max-w-fit border border-gray-500 py-5 px-3">
                                    {restaurant?.businessHours?.map(
                                        (item, index) => (
                                            <div
                                                className="grid grid-cols-2 w-[232px] py-1 text-sm font-medium"
                                                key={index}
                                            >
                                                <span
                                                    className={`uppercase text-center ${
                                                        getCurrentDay() ===
                                                        item.dayOfWeek
                                                            ? "text-red-600"
                                                            : ""
                                                    }`}
                                                >
                                                    {daysOfWeek[item.dayOfWeek]}
                                                </span>
                                                <span
                                                    className={`text-center ${
                                                        getCurrentDay() ===
                                                        item.dayOfWeek
                                                            ? "text-red-600"
                                                            : ""
                                                    }`}
                                                >
                                                    {formatTime(item.openTime)}{" "}
                                                    -{" "}
                                                    {formatTime(item.closeTime)}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="col-span-2 px-4 py-2 bg-white flex flex-col gap-2 rounded-md">
                                <h2 className="py-1 text-[20px] font-semibold">
                                    Nhận xét và đánh giá
                                </h2>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-semibold">
                                            Đánh giá:
                                        </span>
                                        <Rating
                                            fractions={1}
                                            value={ratingValue}
                                            onChange={handleRatingChange}
                                        />
                                    </div>
                                    <Textarea
                                        placeholder="Nhập bình luận của bạn..."
                                        autosize
                                        minRows={3}
                                        maxRows={5}
                                        value={comment}
                                        onChange={(event) =>
                                            setComment(
                                                event.currentTarget.value
                                            )
                                        }
                                    />
                                    <button
                                        className="w-36 py-2 bg-[#d02028] text-sm text-white rounded-sm"
                                        onClick={handleCreateReviewComment}
                                    >
                                        Gửi đánh giá
                                    </button>
                                </div>

                                <div className="flex flex-col gap-2 mt-5">
                                    <span className="text-sm flex gap-2 font-semibold border-b pb-2">
                                        Nhận xét của khách hàng:{" "}
                                        <p className="font-medium">
                                            ({reviewComments?.length} nhận xét)
                                        </p>
                                    </span>

                                    <div className="flex flex-col gap-2">
                                        {reviewComments?.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col gap-2 border-b py-1"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold">
                                                        {item.fullName}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {formatDate(
                                                            item.createdDate
                                                        )}
                                                    </span>
                                                </div>
                                                <Rating
                                                    readOnly
                                                    fractions={1}
                                                    value={item.rating}
                                                    size="xs"
                                                />
                                                <div className="text-sm">
                                                    {item.content}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalAlert
                isModalOpen={isModalOpen}
                alertContent={alertContent}
                handleCancel={handleCancel}
            />
        </section>
    );
}
