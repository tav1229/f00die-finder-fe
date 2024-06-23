import AtomDropdown from "@/components/Atoms/AtomDropdown";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Clock, Baby, UserRound } from "lucide-react";
import { DatePicker } from "antd";

export default function BookingForm({ id, booking, onBooking }) {
    const [time, setTime] = useState("12:00");
    const [numberOfAdults, setNumberOfAdults] = useState(1);
    const [numberOfChildren, setNumberOfChildren] = useState(1);
    const [date, setDate] = useState(null);

    useEffect(() => {
        if (booking) {
            setTime(booking?.time);
            setNumberOfAdults(booking?.numberOfAdults);
            setNumberOfChildren(booking?.numberOfChildren);
            setDate(booking?.date);
        } else {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split("T")[0];
            setDate(formattedDate);
        }
    }, []);

    const numbers = Array.from({ length: 200 }, (_, index) => ({
        id: String(index),
        name: String(index),
    }));

    const timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const timeString = `${hour.toString().padStart(2, "0")}:${minute
                .toString()
                .padStart(2, "0")}`;
            timeOptions.push({ id: timeString, name: timeString });
        }
    }

    const onChange = (date, dateString) => {
        setDate(dateString);
        console.log(date, dateString);
    };

    const handleClickBooking = () => {
        // const dateTime = new Date(`${date}T${time}:00.626Z`);
        // const isoString = dateTime.toISOString();
        const booking = {
            restaurantId: id,
            time: time,
            date: date,
            customerName: null,
            customerPhone: null,
            numberOfAdults: numberOfAdults,
            numberOfChildren: numberOfChildren,
            note: null,
        };
        onBooking(booking);
        // // setBooking(booking);
        // localStorage.setItem("booking", JSON.stringify(booking));
        // navigate(`/restaurant/${id}/booking`);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex w-full gap-2">
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="number-adults"
                        className="flex items-center font-medium text-sm gap-1 text-gray-800"
                    >
                        <UserRound className="w-5 h-5" /> Người lớn
                    </label>
                    <AtomDropdown
                        id="number-adults"
                        // className="w-[207px] h-[34px] rounded-none text-gray-600"
                        options={numbers}
                        onChange={(value) => setNumberOfAdults(value)}
                        value={numberOfAdults.toString()}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="number-baby"
                        className="flex items-center font-medium text-sm gap-1 text-gray-800"
                    >
                        <Baby className="w-5 h-5" /> Trẻ em
                    </label>
                    <AtomDropdown
                        id="number-baby"
                        // className="w-[207px] h-[34px] rounded-none text-gray-600"
                        options={numbers}
                        value={numberOfChildren.toString()}
                        onChange={(value) => setNumberOfChildren(value)}
                    />
                </div>
            </div>
            <div className="flex w-full gap-2">
                <div className="flex flex-col gap-2 w-full">
                    <label
                        htmlFor="date"
                        className="flex items-center font-medium text-sm gap-1 text-gray-800"
                    >
                        <Clock className="w-5 h-5" /> Thời gian
                    </label>
                    <div className="flex w-full gap-2">
                        {date && (
                            <DatePicker
                                defaultValue={dayjs(date, "YYYY-MM-DD")}
                                onChange={onChange}
                                className="h-[38px] border w-full hover:border-gray-300 focus:border-gray-300 active:border-gray-300"
                            />
                        )}
                        <AtomDropdown
                            id="time"
                            options={timeOptions}
                            value={time}
                            onChange={(value) => setTime(value)}
                        />
                    </div>
                </div>
            </div>
            <button
                onClick={handleClickBooking}
                type="button"
                className="w-full bg-[#D02028] mt-4 mb-2 text-white h-[38px] rounded-md font-medium"
            >
                Đặt chỗ
            </button>
        </div>
    );
}
