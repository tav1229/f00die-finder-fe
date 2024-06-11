import Img from "@/assets/images/bg.png";

export default function BookingHistoryCard({ status, reservation, onClick }) {
    function convertISOToDateTime(isoString) {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return (
        <div className="flex flex-col gap-2 p-2 rounded-md bg-white" onClick={onClick}>
            <div className="py-3 flex justify-between gap-1 font-medium border-b">
                <div className="px-1 flex-shrink-0">
                    <img
                        src={reservation?.restaurantImageUrl || Img}
                        alt=""
                        className="h-[111px] w-[111px] object-cover rounded-md"
                    />
                </div>
                <div className="flex flex-col w-full px-1 text-sm gap-1">
                    <span className="flex gap-1 justify-between">
                        <span>
                            ID:{" "}
                            <span className="text-[#878585]">{reservation?.id}</span>
                        </span>
                        <span className="text-[#878585]">
                            {convertISOToDateTime(reservation?.createdDate)}
                        </span>
                    </span>
                    <h3 className="text-base font-semibold">
                        {reservation?.restaurantName}
                    </h3>
                    <span>Đặt chỗ</span>
                    <div className="flex justify-between items-center">
                        <span>Thời gian đến</span>
                        <span>{convertISOToDateTime(reservation?.time)}</span>
                    </div>
                </div>
            </div>
            <div className="py-2 flex font-medium justify-between items-center text-sm text-[#877575]">
                <span>
                    {status === 0
                        ? "Chờ xác nhận"
                        : status === 3
                        ? "Đã hủy"
                        : status === 1
                        ? "Đã tiếp nhận"
                        : status === 2
                        ? "Đã từ chối"
                        : ""}
                </span>
                <span>
                    {status === 0
                        ? "Chờ kiểm tra thông tin giao dịch"
                        : status === 1
                        ? "Đã chấp thuận"
                        : status === 2
                        ? "Từ chối bởi F00die Finder"
                        : status === 3
                        ? "Hủy bởi bạn"
                        : ""}
                </span>
            </div>
            {status === 2 ||
                (status === 3 && (
                    <div className="py-2 flex justify-end items-center px-2">
                        <button className="py-2 px-6 rounded-sm text-sm bg-[#F01B23] font-medium text-white">
                            Đặt lại
                        </button>
                    </div>
                ))}
        </div>
    );
}
