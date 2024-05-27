import Navigation from "./Navigation";
import StatisticCard from "../../components/StatisticCard";
import { Users, Building2, BriefcaseBusiness } from "lucide-react";
import PieChart from "../../components/Chart/PieChart";
import ColumnChart from "../../components/Chart/ColumnChart";
export default function Admin() {
    return (
        <section className="flex justify-center bg-[#EEEEEE] w-full">
            <div className="grid grid-cols-5 gap-4 w-full p-4 max-w-[1280px] min-h-screen">
                <div className="col-span-1 h-auto">
                    <Navigation />
                </div>

                <div className="col-span-4 flex flex-col rounded-md px-5">
                    <h1 className="text-lg font-semibold">Quản lý đặt bàn</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                        <StatisticCard
                            title="Tổng số người dùng"
                            icon={Users}
                            color="yellow"
                            total={10}
                        />
                        <StatisticCard
                            title="Tổng số nhà hàng"
                            icon={Building2}
                            color="orange"
                            total={10}
                        />
                        <StatisticCard
                            title="Tổng số đơn đặt bàn"
                            icon={BriefcaseBusiness}
                            color="red"
                            total={10}
                        />
                    </div>
                    <div className="grid grid-cols-5 gap-4 mt-5">
                        <div className="col-span-3 bg-white rounded-md">
                            <ColumnChart />
                        </div>
                        <div className="col-span-2 bg-white rounded-md">
                            <PieChart />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
