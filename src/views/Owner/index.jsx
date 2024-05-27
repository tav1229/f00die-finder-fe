import Navigation from "./Navigation";
import { FaBook } from "react-icons/fa";
export default function Owner() {
    return (
        <section className="flex justify-center bg-[#EEEEEE] w-full">
            <div className="grid grid-cols-5 gap-4 w-full p-4 max-w-[1280px] min-h-screen">
                <div className="col-span-1 h-auto">
                    <Navigation />
                </div>
                <div className="col-span-4 flex flex-col rounded-md bg-white py-3 px-5">
                    <h1 className="text-lg font-semibold">DashBoard</h1>

                    <aside className="grid grid-cols-3 gap-5 w-full py-5">
                        <div className="grid grid-cols-4 items-center gap-2 bg-[#03BBD3] rounded-lg overflow-hidden shadow-xl">
                            <div className="col-span-1 bg-[#06A5BB] h-full flex items-center justify-center">
                                <FaBook className="w-8 h-8 text-white" />
                            </div>
                            <div className="col-span-3 flex flex-col gap-1 py-4">
                                <h3 className="text-base font-medium text-white">
                                    Tổng số đơn đặt bàn
                                </h3>
                                <p className="text-xl font-bold text-white">
                                    100
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-2 bg-[#FE9900] rounded-lg overflow-hidden shadow-xl">
                            <div className="col-span-1 bg-[#E18602] h-full flex items-center justify-center">
                                <FaBook className="w-8 h-8 text-white" />
                            </div>
                            <div className="col-span-3 flex flex-col gap-1 py-4">
                                <h3 className="text-base font-medium text-white">
                                    Tổng số đơn đặt bàn trong tháng
                                </h3>
                                <p className="text-xl font-bold text-white">
                                    10
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-2 bg-[#8BC24A] rounded-lg overflow-hidden shadow-xl">
                            <div className="col-span-1 bg-[#7CAC40] h-full flex items-center justify-center">
                                <FaBook className="w-8 h-8 text-white" />
                            </div>
                            <div className="col-span-3 flex flex-col gap-1 py-4">
                                <h3 className="text-base font-medium text-white">
                                    Tổng số đơn chấp thuận
                                </h3>
                                <p className="text-xl font-bold text-white">
                                    7
                                </p>
                            </div>
                        </div>


                    </aside>
                </div>
            </div>
        </section>
    );
}
