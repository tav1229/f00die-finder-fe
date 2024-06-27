import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import UserNavigation from "./UserNavigation";
import BookingHistoryCard from "../../components/BookingHistoryCard";
import { getMyReservation, getReservation } from "../../apis/reservation";
import { useEffect, useState } from "react";
import NoData from "../../assets/NoData";
import { Pagination } from "@mantine/core";
import ModalBookingDetail from "../../components/ModalBookingDetail";
import ModalAlert from "../../components/ModalAlert";
import { updateReservationStatus } from "../../apis/reservation";
import { toast } from "react-toastify";

export default function BookingHistory() {
    const [activeTab, setActiveTab] = useState(0);
    const [reservations, setReservations] = useState([]);
    const [reservation, setReservation] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenModalAlert, setIsOpenModalAlert] = useState(false);
    const [meta, setMeta] = useState({
        pageSize: 1,
        currentPage: 1,
        totalPages: 1,
    });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await getMyReservation(5, 1, 0);
                setReservations(response.data);
                setMeta(response.meta);
                console.log("meta: ", response.meta, meta);
            } catch (error) {
                console.error(
                    `Error in fetchReservations request: ${error.message}`
                );
            }
        };

        fetchReservations();
    }, []);

    const filterReservations = async (status, pageNumber = 1) => {
        setActiveTab(status);
        try {
            const response = await getMyReservation(5, pageNumber, status);
            console.log("response", response, response.data.length === 0);
            setReservations(response.data);
            setMeta(response.meta);
        } catch (error) {
            console.error(
                `Error in filterReservations request: ${error.message}`
            );
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        filterReservations(activeTab, page);
    };

    function convertDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);

        const date = dateTime.getDate();
        const month = dateTime.getMonth() + 1; // getMonth() trả về từ 0 (tháng 1) đến 11 (tháng 12)
        const year = dateTime.getFullYear();

        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();

        // Đảm bảo rằng ngày, tháng, giờ và phút luôn có 2 chữ số
        const formattedDate = `${date.toString().padStart(2, "0")}/${month
            .toString()
            .padStart(2, "0")}/${year}`;
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;

        return { date: formattedDate, time: formattedTime };
    }

    const handleClickReservation = async (reservationId) => {
        try {
            const response = await getReservation(reservationId);
            const { date, time } = convertDateTime(response.data.time);
            setReservation({
                ...response.data,
                time: time,
                date: date,
            });
            setIsModalOpen(true);
        } catch (error) {
            console.error(
                `Error in handleClickReservation request: ${error.message}`
            );
        }
    };

    const handleClickCancelReservation = () => {
        if (reservation.reservationStatus === 0) {
            setIsOpenModalAlert(true);
        } else {
            setIsModalOpen(false)
        }
    };

    const handleCancelReservation = async (reservationId) => {
        try {
            const response = await updateReservationStatus(reservationId, 3);
            if (response.status === 200) {
                // Cập nhật trạng thái thành công, cập nhật lại danh sách đặt chỗ
                setReservations(
                    reservations.map((reservation) => {
                        if (reservation.id === reservationId) {
                            return {
                                ...reservation,
                                reservationStatus: 3,
                            };
                        }
                        return reservation;
                    })
                );
                toast.success("Hủy đơn đặt chỗ thành công!");
            } else {
                //
            }
        } catch (error) {
            console.error(
                `Error in handleCancelReservation request: ${error.message}`
            );
            toast.error("Hủy đơn đặt chỗ thất bại!");
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
                        Lịch sử đặt chỗ
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <UserNavigation />
                    <div className="col-span-2 flex flex-col gap-3">
                        <nav className="flex flex-row gap-6 h-14 bg-white text-sm font-medium py-1 px-2">
                            <button
                                className={`flex justify-center items-center px-1 ${
                                    activeTab === 0
                                        ? "border-b-2 border-[#d02028]"
                                        : ""
                                } `}
                                onClick={() => filterReservations(0)}
                            >
                                Chờ xác nhận
                            </button>
                            <button
                                className={`flex justify-center items-center px-1 ${
                                    activeTab === 1
                                        ? "border-b-2 border-[#d02028]"
                                        : ""
                                } `}
                                onClick={() => filterReservations(1)}
                            >
                                Đã tiếp nhận
                            </button>
                            <button
                                className={`flex justify-center items-center px-1 ${
                                    activeTab === 2
                                        ? "border-b-2 border-[#d02028]"
                                        : ""
                                } `}
                                onClick={() => filterReservations(2)}
                            >
                                Đã từ chối
                            </button>
                            <button
                                className={`flex justify-center items-center px-1 ${
                                    activeTab === 3
                                        ? "border-b-2 border-[#d02028]"
                                        : ""
                                } `}
                                onClick={() => filterReservations(3)}
                            >
                                Đã hủy
                            </button>
                            <button
                                className={`flex justify-center items-center px-1 ${
                                    activeTab === -1
                                        ? "border-b-2 border-[#d02028]"
                                        : ""
                                } `}
                                onClick={() => filterReservations(-1)}
                            >
                                Tất cả
                            </button>
                        </nav>
                        {reservations?.map((reservation, index) => (
                            <BookingHistoryCard
                                key={index}
                                reservation={reservation}
                                status={reservation.reservationStatus}
                                onClick={() =>
                                    handleClickReservation(reservation.id)
                                }
                            />
                        ))}
                        {(reservations?.length === 0 || !reservations) && (
                            <div className="flex items-center justify-center w-full h-[300px]">
                                <NoData />
                            </div>
                        )}
                        {meta?.totalPages > 0 && (
                            <div className="flex justify-center w-full">
                                <Pagination
                                    total={meta.totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="#d02028"
                                    radius="xl"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ModalBookingDetail
                isModalOpen={isModalOpen}
                handleCancel={() => setIsModalOpen(false)}
                handleSubmit={handleClickCancelReservation}
                bookingDetail={reservation}
                okContentButton={reservation.reservationStatus === 0 ? "Hủy đơn đặt bàn" : ""}
            />
            <ModalAlert
                isModalOpen={isOpenModalAlert}
                alertContent={{
                    title: "Hủy đơn đặt bàn",
                    content: "Bạn có chắc muốn hủy đơn đặt bàn không?",
                    status: "warning",
                }}
                handleCancel={() => setIsOpenModalAlert(false)}
                handleSubmit={() => { handleCancelReservation(reservation.id); setIsOpenModalAlert(false); }}
            />
        </section>
    );
}
