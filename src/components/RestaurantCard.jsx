import { Link } from "react-router-dom";
import  DefaultImg from "../assets/images/bg.png";

export default function RestaurantCard({ restaurant }) {
    // function get first 3 cuisines 
    const cuisines = (restaurant?.cuisineTypes || []).slice(0, 3);
    const restaurantCuisines = cuisines.map((cuisine) => cuisine.name).join(", ");
    return (
        <Link
            to={`/restaurant/${restaurant.id}`}
            className="flex flex-col gap-1 max-w-[244px] min-w-[220px] max-h-[350px] pb-3 font-sans" 
        >
            <img
                src={restaurant?.images[0] || DefaultImg}
                alt=""
                className="w-[240px] h-[144px] object-cover rounded-lg"
            />
            <h2 className="text-lg font-bold hover:text-[#d02028] w-fit line-clamp-2">
                {restaurant?.name}
            </h2>
            <span className="text-sm line-clamp-2">{`${restaurant?.location.address}, ${restaurant?.wardOrCommune.name}, ${restaurant?.district.name}, ${restaurant?.provinceOrCity.name}`}</span>
            <span className="text-sm font-bold text-[#d02028]">
                {restaurant?.note}
            </span>
            <span className="text-sm line-clamp-2">
                {/* {restaurant?.specialDishes} */}
                {restaurantCuisines}
            </span>
            <div
                to={`/restaurant/${restaurant.id}`}
                className="font-medium underline hover:text-[#d02028] w-fit text-sm transition-colors duration-300"
            >
                Đặt chỗ
            </div>
        </Link>
    );
}
