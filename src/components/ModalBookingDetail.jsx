import { Modal } from "antd";
import { useState, useEffect } from "react";
import { Clock, Baby, UserRound, Phone, Mail, CircleUserRound } from "lucide-react";

export default function ModalBookingDetail({
    isModalOpen,
    bookingDetail,
    handleCancel,
    onSubmit
}) {
    return (
        <Modal
            open={isModalOpen}
            // onOk={() => setVisible(false)}
            onCancel={handleCancel}
            footer={null}
            width={636}
        >
            <div className="flex flex-col items-center rounded-md bg-white">
                <h1 className="text-xl font-semibold w-full border-b-[1.5px] border-gray-200 pb-1 text-center">
                    Xác nhận đơn đặt chỗ
                </h1>

                <div className="grid grid-cols-2 gap-3 w-full py-4">
                    <div className="flex text-gray-800 flex-col gap-3 p-2 border rounded-md">
                        <h2 className="text-base font-semibold">
                            Thông tin đặt chỗ
                        </h2>
                        <div className="text-sm flex items-center ml-1 gap-2 font-semibold">
                            <Clock className="w-[18px] h-[18px] text-gray-500" />{" "}
                            <span>Ngày đến:</span> <span>{bookingDetail?.date}</span>{" "}
                        </div>
                        <div className="text-sm flex items-center ml-1 gap-2 font-semibold">
                            <Clock className="w-[18px] h-[18px] text-gray-500" />{" "}
                            <span>Giờ đến:</span> <span>{bookingDetail?.time}</span>{" "}
                        </div>
                        <div className="text-sm flex items-center ml-1 gap-2 font-semibold">
                            <UserRound className="w-[18px] h-[18px] text-gray-500" />{" "}
                            <span>{bookingDetail?.numberOfAdults}</span>{" "}
                            <Baby className="w-[18px] h-[18px] text-gray-500" />
                            <span>{bookingDetail?.numberOfChildren}</span>{" "}
                        </div>
                    </div>
                    <div className="flex text-gray-800 flex-col gap-3 p-2 border rounded-md">
                        <h2 className="text-base font-semibold">
                            Thông tin người đặt
                        </h2>
                        <div className="text-sm flex items-center ml-1 gap-2 font-semibold">
                            <Phone className="w-[18px] h-[18px] text-gray-500" />{" "}
                            <span>Số điện thoại:</span> <span>{bookingDetail?.customerPhone}</span>{" "}
                        </div>
                        <div className="text-sm flex items-center ml-1 gap-2 font-semibold">
                            <Mail className="w-[18px] h-[18px] text-gray-500" />{" "}
                            <span>Email:</span> <span>{bookingDetail?.email}</span>{" "}
                        </div>
                        <div className="text-sm flex items-center ml-1 gap-2 font-semibold">
                            <CircleUserRound className="w-[18px] h-[18px] text-gray-500" />{" "}
                            <span>Tên liên lạc:</span> <span>{bookingDetail?.customerName}</span>{" "}
                        </div>
                    </div>
                    <div className="col-span-2 flex">
                        <label htmlFor="note" className="min-w-16">
                            <span className="text-[15px] font-semibold text-gray-800">
                                Ghi chú:
                            </span>
                        </label>
                        <textarea
                            id="note"
                            className="border border-gray-300 w-full h-[100px] p-2 rounded-md focus:outline-none text-gray-400 font-semibold"
                            value={bookingDetail?.note}
                            readOnly
                        ></textarea>
                    </div>
                </div>

                <div className="flex justify-between w-full mt-5 gap-4">
                    <button
                        className="w-full h-[36px] rounded-sm border border-gray-300 text-gray-800 font-semibold"
                        onClick={handleCancel}
                    >
                        Quay lại
                    </button>
                    <button
                        className="w-full h-[36px] rounded-sm bg-[#D02028] text-white font-semibold"
                        onClick={onSubmit ? onSubmit : handleCancel}
                    >
                        OK
                    </button>
                </div>
            </div>
        </Modal>
    );
}
