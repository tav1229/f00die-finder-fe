export default function BookingHistoryCard({ status }) {
    return (
        <div className="flex flex-col gap-2 p-2 rounded-md bg-white">
            <div className="py-3 flex justify-between gap-1 font-medium border-b">
                <div className="px-1 flex-shrink-0">
                    <img
                        src="https://pasgo.vn/Upload/anh-diem-den/lau-vit-lu-beo-le-duan-300-226890695093.webp"
                        alt=""
                        className="h-[111px] w-[111px] object-cover rounded-md"
                    />
                </div>
                <div className="flex flex-col w-full px-1 text-sm gap-1">
                    <span className="flex gap-1">
                        ID: <p className="text-[#878585]">PG175738395724</p>
                    </span>
                    <h3 className="text-base font-medium">
                        Lẩu vịt Lữ Béo - Lê Duẩn
                    </h3>
                    <span>Đặt chỗ</span>
                    <div className="flex justify-between items-center">
                        <span>Thời gian đến</span>
                        <span>25/05/2024 11:15</span>
                    </div>
                </div>
            </div>
            <div className="py-2 flex font-medium justify-between items-center text-sm text-[#877575]">
                <span>
                    {status === "pending"
                        ? "Chờ xác nhận"
                        : status === "cancelled"
                        ? "Đã hủy"
                        : ""}
                </span>
                <span>
                    {status === "pending"
                        ? "Chờ kiểm tra thông tin giao dịch"
                        : status === "cancelled"
                        ? "Hủy bởi bạn/chủ nhà hàng"
                        : ""}
                </span>
            </div>
            {status === "cancelled" && (
                <div className="py-2 flex justify-end items-center px-2">
                    <button className="py-2 px-6 rounded-sm text-sm bg-[#F01B23] font-medium text-white">
                        Đặt lại
                    </button>
                </div>
            )}
        </div>
    );
}
