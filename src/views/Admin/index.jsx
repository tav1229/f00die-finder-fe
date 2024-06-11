import Navigation from "./Navigation";
import StatisticCard from "../../components/StatisticCard";
import { Users, Building2, BriefcaseBusiness } from "lucide-react";
import PieChart from "../../components/Chart/PieChart";
import ColumnChart from "../../components/Chart/ColumnChart";
import { useEffect, useState } from "react";
import {
    reservationsByMonth,
    totalUsers,
    totalRestaurants,
    totalReservations,
} from "../../apis/adminDashboard";

export default function Admin() {
    const [totalUser, setTotalUser] = useState(0);
    const [totalRestaurant, setTotalRestaurant] = useState(0);
    const [totalReservation, setTotalReservation] = useState(0);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchTotalUser = async () => {
            const response = await totalUsers();
            if (response.status === 200) {
                setTotalUser(response.data);
            }
        };
        const fetchTotalRestaurant = async () => {
            const response = await totalRestaurants();
            if (response.status === 200) {
                setTotalRestaurant(response.data);
            }
        };
        const fetchTotalReservation = async () => {
            const response = await totalReservations();
            if (response.status === 200) {
                setTotalReservation(response.data);
            }
        };
        const fetchReservationsByMonth = async () => {
            const response = await reservationsByMonth();
            if (response.status === 200) {
                setReservations(response.data);
            }
        };

        fetchTotalUser();
        fetchTotalRestaurant();
        fetchTotalReservation();
        fetchReservationsByMonth();
    }, []);

    const data = () => {
        const result = Object.keys(reservations).map((key) => {
            return {
                x: `Tháng ${key}`,
                y: reservations[key],
            };
        });
        return result;
    };

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
                            total={totalUser?.totalUsers}
                        />
                        <StatisticCard
                            title="Tổng số nhà hàng"
                            icon={Building2}
                            color="orange"
                            total={totalRestaurant?.totalRestaurants}
                        />
                        <StatisticCard
                            title="Tổng số đơn đặt bàn"
                            icon={BriefcaseBusiness}
                            color="red"
                            total={totalReservation?.totalReservations}
                        />
                    </div>
                    <div className="grid grid-cols-5 gap-4 mt-5">
                        <div className="col-span-3 bg-white rounded-md">
                            <ColumnChart title="Số lượng đơn đặt bàn trong năm" data={data()}/>
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
