import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import UserNavigation from "./UserNavigation";
import { useEffect, useState } from "react";
import NoData from "../../assets/NoData";
import { Pagination } from "@mantine/core";
import { getMySavedRestaurant, unsaveRestaurant } from "../../apis/restaurant";
import { Rating } from "@mantine/core";
import { Heart } from "lucide-react";

export default function RestaurantSaved() {
    const [meta, setMeta] = useState({
        pageSize: 1,
        currentPage: 1,
        totalPages: 1,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await getMySavedRestaurant(1, 6);
                setRestaurants(response.data);
                setMeta(response.meta);
            } catch (error) {
                console.error(
                    `Error in fetchRestaurants request: ${error.message}`
                );
            }
        };

        fetchRestaurants();
    }, []);

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        const response = await getMySavedRestaurant(page, 6);
        setRestaurants(response.data);
    };

    const handleUnsave = async (event, restaurantId) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            await unsaveRestaurant(restaurantId);
            const newRestaurants = restaurants.filter(
                (restaurant) => restaurant.id !== restaurantId
            );
            setRestaurants(newRestaurants);
            const ids_saved = JSON.parse(localStorage.getItem("ids_saved"));
            if (ids_saved?.length > 0) {
                const newIds = ids_saved.filter((id) => id !== restaurantId);
                if (newIds.length >= 0) {
                    localStorage.setItem("ids_saved", JSON.stringify(newIds));
                }
            }
        } catch (error) {
            console.error(`Error in handleUnsave request: ${error.message}`);
        }
    };

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
                        Danh sách nhà hàng yêu thích
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <UserNavigation />
                    <div className="col-span-2 flex flex-col gap-7 bg-white py-6 px-2">
                        <h3 className="text-lg font-medium text-center mb-6 uppercase">
                            Danh sách nhà hàng yêu thích
                        </h3>
                        <div className="flex gap-2 flex-wrap">
                            {restaurants.length > 0 ? (
                                restaurants.map((restaurant) => (
                                    <Link
                                        key={restaurant.id}
                                        to={`/restaurant/${restaurant.id}`}
                                        className="flex flex-col items-center pb-4 relative cursor-pointer border gap-1 justify-start"
                                    >
                                        <div className="relative">
                                            <img
                                                src={restaurant.image}
                                                className="h-[240px] w-[240px] object-cover"
                                                alt=""
                                            />
                                            <div className="absolute w-full flex flex-col gap-1 items-center bottom-0 bg-[rgb(65,64,59,0.6)] p-2">
                                                <span className="text-base text-white font-semibold truncate">
                                                    {restaurant.name}
                                                </span>
                                                <Rating
                                                    fractions={4}
                                                    size="xs"
                                                    value={restaurant?.rating}
                                                    readOnly
                                                />
                                                <span className="text-sm text-gray-300">
                                                    {
                                                        restaurant?.location
                                                            .address
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        <span className="text-sm font-semibold text-[#d02028]">
                                            {restaurant.note}
                                        </span>
                                        <button
                                            className="border border-gray-300 rounded-md flex items-center p-2 gap-2 text-sm font-semibold hover:bg-[#d02028] hover:text-white"
                                            onClick={(event) =>
                                                handleUnsave(
                                                    event,
                                                    restaurant.id
                                                )
                                            }
                                        >
                                            <Heart className="w-4 h-4" /> Bỏ yêu
                                            thích
                                        </button>
                                    </Link>
                                ))
                            ) : (
                                <div className="flex w-full h-full items-center justify-center">
                                    <NoData />
                                </div>
                            )}
                        </div>

                        {restaurants.length > 0 && (
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
        </section>
    );
}
