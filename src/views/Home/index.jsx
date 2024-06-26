import { Search, ListFilter } from "lucide-react";
import AtomDropdown from "@/components/Atoms/AtomDropdown";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { Skeleton } from "@mantine/core";
import SkeletonRestaurantCard from "@/components/SkeletonRestaurantCard";
import SkeletonRestaurantCard2 from "../../components/SkeletonRestaurantCard2";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { getCustomerType } from "@/apis/type/customerType";
import { getCuisineType } from "@/apis/type/cuisineType";
import { getServingType } from "../../apis/type/servingType";
import { getPriceRangePerPerson } from "../../apis/type/priceRangePerPerson";
import { getProvinceOrCity, getDistrict } from "@/apis/location";
import { getRestaurants, getMySavedRestaurant, getRecommendedRestaurants, getPublicRecommendedRestaurants } from "@/apis/restaurant";
import { useRestaurantStore } from "@/storages/restaurant";
import RestaurantCard from "../../components/RestaurantCard";
import { checkExpiration } from "../../utils/checkExpiration";

export default function Home() {
    const navigate = useNavigate();

    const { setRestaurants } = useRestaurantStore();

    const [restaurantsRecommended, setRestaurantsRecommended] = useState([]);
    const [restaurantsNew, setRestaurantsNew] = useState([]);
    const [restaurantsServiceType, setRestaurantsServiceType] = useState([]);
    const [restaurantsCuisineType, setRestaurantsCuisineType] = useState([]);

    const [randomServingTypeIndex, setRandomServingTypeIndex] = useState(0);
    const [randomCuisineTypeIndex, setRandomCuisineTypeIndex] = useState(0);

    const [cuisineType, setCuisineType] = useState("");
    const [provinceOrCity, setProvinceOrCity] = useState("");
    const [district, setDistrict] = useState("");
    const [servingType, setServingType] = useState("");
    const [customerType, setCustomerType] = useState("");
    const [priceRangePerPerson, setPriceRangePerPerson] = useState("");

    const [cuisineTypes, setCuisineTypes] = useState([]);
    const [provinceOrCitys, setProvinceOrCitys] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [servingTypes, setServingTypes] = useState([]);
    const [customerTypes, setCustomerTypes] = useState([]);
    const [priceRangePerPersons, setPriceRangePerPersons] = useState([]);

    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const fetchRestaurantsRecommended = async () => {
            try {
                let response;
                if (checkExpiration()) {
                    response = await getPublicRecommendedRestaurants();
                } else {
                    response = await getRecommendedRestaurants();
                }
                setRestaurantsRecommended(response.data);
            } catch (error) {
                console.error(
                    `Error in fetchRestaurantsRecommended request: ${error.message}`
                );
            }
        };

        const fetchRestaurantsNew = async () => {
            try {
                const response = await getRestaurants({
                    sortType: 4,
                });
                setRestaurantsNew(response.data);
            } catch (error) {
                console.error(
                    `Error in fetchRestaurantsNew request: ${error.message}`
                );
            }
        };

        const fetchMySavedRestaurant = async () => {
            try {
                const response = await getMySavedRestaurant(1, 100);
                const ids_saved = response.data?.map(
                    (restaurant) => restaurant.id
                );
                localStorage.setItem("ids_saved", JSON.stringify(ids_saved));
            } catch (error) {
                console.error(
                    `Error in fetchMySavedRestaurant request: ${error.message}`
                );
            }
        };

        fetchRestaurantsNew();
        fetchRestaurantsRecommended();
        fetchMySavedRestaurant();
    }, []);

    useEffect(() => {
        const fetchCuisineTypes = async () => {
            try {
                const response = await getCuisineType();
                setCuisineTypes([
                    {
                        id: "",
                        name: "Món ăn",
                        iconUrl: null,
                    },
                    ...response.data,
                ]);
                setCuisineType("");
            } catch (error) {
                console.error(
                    `Error in fetchCuisineTypes request: ${error.message}`
                );
            }
        };

        const fetchCustomerTypes = async () => {
            try {
                const response = await getCustomerType();
                setCustomerTypes([
                    {
                        id: "",
                        name: "Kiểu khách hàng",
                    },
                    ...response.data,
                ]);
                setCustomerType("");
            } catch (error) {
                console.error(
                    `Error in fetchCustomerTypes request: ${error.message}`
                );
            }
        };

        const fetchProvinceOrCitys = async () => {
            try {
                const response = await getProvinceOrCity();
                setProvinceOrCitys([
                    {
                        id: "",
                        name: "Tỉnh/Thành phố",
                    },
                    ...response.data,
                ]);
                setProvinceOrCity("");
            } catch (error) {
                console.error(
                    `Error in fetchProvinceOrCitys request: ${error.message}`
                );
            }
        };

        const fetchServingTypes = async () => {
            try {
                const response = await getServingType();
                setServingTypes([
                    {
                        id: "",
                        name: "Loại dịch vụ",
                    },
                    ...response.data,
                ]);
                setServingType("");
            } catch (error) {
                console.error(
                    `Error in fetchServingTypes request: ${error.message}`
                );
            }
        };

        const fetchPriceRangePerPersons = async () => {
            try {
                const response = await getPriceRangePerPerson();
                setPriceRangePerPersons([
                    {
                        id: "",
                        name: "Mức giá",
                    },
                    ...response.data,
                ]);
                setPriceRangePerPerson("");
            } catch (error) {
                console.error(
                    `Error in fetchPriceRangePerPersons request: ${error.message}`
                );
            }
        };

        fetchCuisineTypes();
        fetchCustomerTypes();
        fetchProvinceOrCitys();
        fetchServingTypes();
        fetchPriceRangePerPersons();
    }, []);

    useEffect(() => {
        const fetchDistricts = async (provinceOrCityId) => {
            setDistricts([
                {
                    id: "",
                    name: "Quận/Huyện",
                },
            ]);
            try {
                const response = await getDistrict(provinceOrCityId);
                setDistricts([
                    {
                        id: "",
                        name: "Quận/Huyện",
                    },
                    ...response.data,
                ]);
                setDistrict("");
            } catch (error) {
                console.error(
                    `Error in fetchDistricts request: ${error.message}`
                );
            }
        };

        fetchDistricts(provinceOrCity);
    }, [provinceOrCity]);

    useEffect(() => {
        // get random number in servingTypes length
        if (servingTypes?.length > 0) {
            let randomServingTypeIndex =
                Math.floor(Math.random() * servingTypes.length) + 1;

            if (randomServingTypeIndex >= servingTypes.length) {
                randomServingTypeIndex = servingTypes.length - 1;
            }

            setRandomServingTypeIndex(randomServingTypeIndex);

            const fetchRestaurantsServiceType = async () => {
                try {
                    const response = await getRestaurants({
                        servingType: servingTypes[randomServingTypeIndex].id,
                    });
                    setRestaurantsServiceType(response.data);
                } catch (error) {
                    console.error(
                        `Error in fetchRestaurantsServiceType request: ${error.message}`
                    );
                }
            };
            fetchRestaurantsServiceType();
        }
    }, [servingTypes]);

    useEffect(() => {
        // get random number in cuisineTypes length
        if (cuisineTypes?.length > 0) {
            let randomCuisineTypeIndex =
                Math.floor(Math.random() * cuisineTypes.length) + 1;

            if (randomCuisineTypeIndex >= cuisineTypes.length) {
                randomCuisineTypeIndex = cuisineTypes.length - 1;
            }

            setRandomCuisineTypeIndex(randomCuisineTypeIndex);

            const fetchRestaurantsCuisineType = async () => {
                try {
                    const response = await getRestaurants({
                        cuisineType: cuisineTypes[randomCuisineTypeIndex].id,
                        pageSize: 10,
                    });

                    setRestaurantsCuisineType(response.data);
                } catch (error) {
                    console.error(
                        `Error in fetchRestaurantsCuisineType request: ${error.message}`
                    );
                }
            };
            fetchRestaurantsCuisineType();
        }
    }, [cuisineTypes]);

    // const handleFilter = async () => {
    //     const response = await getRestaurants({
    //         provinceOrCityId: provinceOrCity,
    //         districtId: district,
    //         servingType: servingType,
    //         cuisineType: cuisineType,
    //         customerType: customerType,
    //         priceRangePerPerson: priceRangePerPerson,
    //         searchValue: searchValue,
    //     });
    //     navigate("/restaurant");
    //     setRestaurants(response);
    // };
    function getNameById(id, array) {
        const item = array.find(element => element.id === id);
        return item ? item.name : null;
    }
    const filterQueryParams = () => {
        let query = "";
        if (provinceOrCity) {
            query += `&provinceOrCityId=${provinceOrCity}&provinceOrCityName=${getNameById(provinceOrCity, provinceOrCitys)}`;
        }
        if (district) {
            query += `&districtId=${district}&districtName=${getNameById(district, districts)}`;
        }
        if (servingType) {
            query += `&servingType=${servingType}&servingTypeName=${getNameById(servingType, servingTypes)}`;
        }
        if (cuisineType) {
            query += `&cuisineType=${cuisineType}&cuisineTypeName=${getNameById(cuisineType, cuisineTypes)}`;
        }
        if (customerType) {
            query += `&customerType=${customerType}&customerTypeName=${getNameById(customerType, customerTypes)}`;
        }
        if (priceRangePerPerson) {
            query += `&priceRangePerPerson=${priceRangePerPerson}&priceRangePerPersonName=${getNameById(priceRangePerPerson, priceRangePerPersons)}`;
        }
        if (searchValue) {
            query += `&searchValue=${searchValue}`;
        }
        return query;
    };

    const handleFilterCuisineType = async (cuisineType) => {
        const response = await getRestaurants({
            cuisineType: cuisineType,
        });
        navigate("/restaurant");
        setRestaurants(response);
    };

    const getCuisinesHaveIcon = () => {
        return cuisineTypes.filter((cuisine) => cuisine.iconUrl !== null);
    };

    const handleGetThreeCuisineType = (cuisineType) => {
        return cuisineType.slice(0, 3)?.map((cuisine) => cuisine.name).join(", ");
    };
    return (
        <>
            <div className="w-full flex bg-[#F7F6F4] flex-col items-center gap-5 pt-4 pb-6 px-5">
                <div className="w-full flex justify-between max-w-[1230px] items-center">
                    <div className="search  flex justify-center items-center w-[calc(100%*6/7)]">
                        <div className="relative">
                            <AtomDropdown
                                options={provinceOrCitys}
                                value={provinceOrCity}
                                onChange={(id) => setProvinceOrCity(id)}
                                className="rounded-r-none pl-9 !h-[34px]"
                            />
                            <MdLocationPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            id="default-input"
                            placeholder="Tìm kiếm nhà hàng, món ăn..."
                            className="bg-gray-50 border border-[#CCCCCC] h-[34px] outline-none text-gray-700 font-medium text-sm block w-full p-2"
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Link
                            // onClick={() => handleSearch()}
                            to={`/restaurant?${filterQueryParams()}`}
                            className="flex justify-center items-center gap-2 rounded-r-md text-sm h-[34px] flex-shrink-0 py-2 px-5 bg-[#D02028] text-white font-medium"
                        >
                            <Search className="w-5 h-5" />
                            <p>Tìm kiếm</p>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <FaPhoneVolume className="w-6 h-6 text-[#d02028]" />
                        <span className="text-xl font-medium text-[#d02028]">
                            1900 1234
                        </span>
                    </div>
                </div>
            </div>
            <section className="flex flex-col w-full max-w-[1230px]">
                <div className="flex items-center bg-white py-4 mx-2 xl:mx-0 w-full gap-5">
                    <AtomDropdown
                        options={districts}
                        value={district}
                        onChange={(id) => setDistrict(id)}
                        className="!w-[172px]"
                    />
                    <AtomDropdown
                        options={cuisineTypes}
                        value={cuisineType}
                        onChange={(id) => setCuisineType(id)}
                        className="!w-[172px]"
                    />
                    <AtomDropdown
                        options={customerTypes}
                        value={customerType}
                        onChange={(id) => setCustomerType(id)}
                        className="!w-[172px]"
                    />
                    <AtomDropdown
                        options={servingTypes}
                        onChange={(id) => setServingType(id)}
                        className="!w-[172px]"
                    />
                    <AtomDropdown
                        options={priceRangePerPersons}
                        onChange={(id) => setPriceRangePerPerson(id)}
                        className="!w-[172px]"
                    />
                    <Link
                        to={`/restaurant?${filterQueryParams()}`}
                        // onClick={handleFilter}
                        className="flex justify-center ml-10 gap-2 border border-1 border-[#CCCCCC] items-center rounded-md h-[38px] py-2 px-6  text-gray-800 font-medium"
                    >
                        <ListFilter className="w-5 h-5" />
                        <p>Lọc</p>
                    </Link>
                </div>

                <div className="w-full flex flex-col gap-1 py-5 px-14">
                    <h1 className="text-2xl font-bold">Danh mục</h1>
                    <Carousel
                        className="w-full"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="-ml-1 gap-5">
                            {getCuisinesHaveIcon()?.length === 0 && (
                                <>
                                    <CarouselItem className="flex flex-col items-center h-[142px] w-[140px] justify-center pl-1 md:basis-1/5 lg:basis-[14%] cursor-pointer group">
                                        <Skeleton
                                            height={60}
                                            circle
                                            className="mb-2"
                                        />
                                        <Skeleton height={20} width={60} />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-center h-[142px] w-[140px] justify-center pl-1 md:basis-1/5 lg:basis-[14%] cursor-pointer group">
                                        <Skeleton
                                            height={60}
                                            circle
                                            className="mb-2"
                                        />
                                        <Skeleton height={20} width={60} />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-center h-[142px] w-[140px] justify-center pl-1 md:basis-1/5 lg:basis-[14%] cursor-pointer group">
                                        <Skeleton
                                            height={60}
                                            circle
                                            className="mb-2"
                                        />
                                        <Skeleton height={20} width={60} />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-center h-[142px] w-[140px] justify-center pl-1 md:basis-1/5 lg:basis-[14%] cursor-pointer group">
                                        <Skeleton
                                            height={60}
                                            circle
                                            className="mb-2"
                                        />
                                        <Skeleton height={20} width={60} />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-center h-[142px] w-[140px] justify-center pl-1 md:basis-1/5 lg:basis-[14%] cursor-pointer group">
                                        <Skeleton
                                            height={60}
                                            circle
                                            className="mb-2"
                                        />
                                        <Skeleton height={20} width={60} />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-center h-[142px] w-[140px] justify-center pl-1 md:basis-1/5 lg:basis-[14%] cursor-pointer group">
                                        <Skeleton
                                            height={60}
                                            circle
                                            className="mb-2"
                                        />
                                        <Skeleton height={20} width={60} />
                                    </CarouselItem>
                                </>
                            )}
                            {getCuisinesHaveIcon()?.map((monAn, index) => (
                                <CarouselItem
                                    key={index}
                                    className="flex flex-col items-center h-[142px] w-[140px] justify-center pl-1 md:basis-1/5 lg:basis-[14%] cursor-pointer group"
                                // onClick={() =>
                                //     handleFilterCuisineType(monAn.id)
                                // }
                                >
                                    <Link
                                        to={`/restaurant?cuisineType=${monAn.id}&cuisineTypeName=${getNameById(monAn.id, cuisineTypes)}`}
                                        // onClick={() => navigate("/restaurant")}
                                        className="flex flex-col items-center gap-1 justify-center"
                                    >
                                        <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                                            <img
                                                src={monAn.iconUrl}
                                                className="w-10 h-10"
                                                alt=""
                                            />
                                        </div>
                                        <span className="text-sm font-semibold">
                                            {monAn.name}
                                        </span>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hover:bg-[#D02028] hover:text-white" />
                        <CarouselNext className="hover:bg-[#D02028] hover:text-white" />
                    </Carousel>
                </div>

                <div className="flex flex-col w-full px-14 gap-3 mb-11">
                    <h1 className="text-2xl font-bold">
                        Nhà hàng được đề xuất
                    </h1>
                    <span className="text-sm font-medium text-[#333333]">
                        Xem ngay các địa điểm, nhà hàng được gợi ý cho bạn
                    </span>
                    <Carousel
                        className="w-full"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="-ml-1 gap-2">
                            {restaurantsRecommended?.length === 0 && (
                                <>
                                    <CarouselItem className="flex flex-col items-start h-[340px] justify-start pl-1 md:basis-1/3 lg:basis-[21.5%]">
                                        <SkeletonRestaurantCard />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-start h-[340px] justify-start pl-1 md:basis-1/3 lg:basis-[21.5%]">
                                        <SkeletonRestaurantCard />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-start h-[340px] justify-start pl-1 md:basis-1/3 lg:basis-[21.5%]">
                                        <SkeletonRestaurantCard />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-start h-[340px] justify-start pl-1 md:basis-1/3 lg:basis-[21.5%]">
                                        <SkeletonRestaurantCard />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-start h-[340px] justify-start pl-1 md:basis-1/3 lg:basis-[21.5%]">
                                        <SkeletonRestaurantCard />
                                    </CarouselItem>
                                </>
                            )}
                            {restaurantsRecommended?.map((restaurant, index) => (

                                <CarouselItem
                                    key={index}
                                    className="flex flex-col items-start h-[340px] justify-start pl-1 md:basis-1/3 lg:basis-[21.5%]"
                                >
                                    <div
                                        onClick={() =>
                                            navigate(
                                                "/restaurant/" + restaurant.id
                                            )
                                        }
                                        className="flex flex-col items-start relative cursor-pointer gap-1 justify-start"
                                    >
                                        <img
                                            src={restaurant.images[0]}
                                            className="h-[240px] min-w-[240px] rounded-lg object-cover"
                                            alt=""
                                        />
                                        <div className="absolute py-1.5 px-1.5 rounded-lg bg-[#D02028] text-white font-medium text-xs">
                                            Được đề xuất
                                        </div>
                                        <span className="text-base font-bold">
                                            {restaurant.name}
                                        </span>
                                        <span className="text-sm font-bold text-[#d02028]">
                                            {restaurant.note}
                                        </span>
                                        <span className="text-sm line-clamp-2">
                                            {handleGetThreeCuisineType(restaurant.cuisineTypes)}
                                        </span>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hover:bg-[#D02028] hover:text-white" />
                        <CarouselNext className="hover:bg-[#D02028] hover:text-white" />
                    </Carousel>
                </div>

                <div className="flex flex-col w-full px-14 gap-3">
                    <h1 className="text-2xl font-bold">Top nhà hàng mới mở</h1>
                    {/* <span className="text-sm font-medium text-[#333333]">
                        Xem ngay các địa điểm, nhà hàng phổ biến
                    </span> */}
                    <Carousel
                        className="w-full"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="-ml-1 gap-2">
                            {restaurantsNew?.length === 0 && (
                                <>
                                    <CarouselItem className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 ">
                                        <SkeletonRestaurantCard2 />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 ">
                                        <SkeletonRestaurantCard2 />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 ">
                                        <SkeletonRestaurantCard2 />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 ">
                                        <SkeletonRestaurantCard2 />
                                    </CarouselItem>
                                </>
                            )}
                            {restaurantsNew?.map((restaurant, index) => (
                                <CarouselItem
                                    key={index}
                                    className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 "
                                >
                                    <RestaurantCard restaurant={restaurant} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hover:bg-[#D02028] hover:text-white" />
                        <CarouselNext className="hover:bg-[#D02028] hover:text-white" />
                    </Carousel>
                </div>

                <div className="flex flex-col w-full px-14 gap-3">
                    <h1 className="text-2xl font-bold">
                        Top nhà hàng{" "}
                        {servingTypes?.length > 0 &&
                            servingTypes[randomServingTypeIndex]?.name}
                    </h1>
                    {/* <span className="text-sm font-medium text-[#333333]">
                        Xem ngay các địa điểm, nhà hàng phổ biến
                    </span> */}
                    <Carousel
                        className="w-full"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="-ml-1 gap-2">
                            {restaurantsServiceType?.length === 0 && (
                                <>
                                    <CarouselItem className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 ">
                                        <SkeletonRestaurantCard2 />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 ">
                                        <SkeletonRestaurantCard2 />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 ">
                                        <SkeletonRestaurantCard2 />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 ">
                                        <SkeletonRestaurantCard2 />
                                    </CarouselItem>
                                </>
                            )}
                            {restaurantsServiceType?.map((restaurant, index) => (
                                <CarouselItem
                                    key={index}
                                    className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 "
                                >
                                    <RestaurantCard restaurant={restaurant} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hover:bg-[#D02028] hover:text-white" />
                        <CarouselNext className="hover:bg-[#D02028] hover:text-white" />
                    </Carousel>
                </div>

                <div className="flex flex-col w-full px-14 gap-3">
                    <h1 className="text-2xl font-bold">
                        Top nhà hàng{" "}
                        {cuisineTypes?.length > 0 &&
                            cuisineTypes[randomCuisineTypeIndex]?.name}
                    </h1>
                    <Carousel
                        className="w-full"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="-ml-1 gap-2">
                            {restaurantsCuisineType?.length === 0 && (
                                <>
                                    <CarouselItem className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 ">
                                        <SkeletonRestaurantCard2 />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 ">
                                        <SkeletonRestaurantCard2 />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 ">
                                        <SkeletonRestaurantCard2 />
                                    </CarouselItem>
                                    <CarouselItem className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 ">
                                        <SkeletonRestaurantCard2 />
                                    </CarouselItem>
                                </>
                            )}
                            {restaurantsCuisineType?.map((restaurant, index) => (
                                <CarouselItem
                                    key={index}
                                    className="flex flex-col items-start h-[370px] w-[240px] justify-start pl-1 md:basis-1/4 lg:basis-1/5 "
                                >
                                    <RestaurantCard restaurant={restaurant} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hover:bg-[#D02028] hover:text-white" />
                        <CarouselNext className="hover:bg-[#D02028] hover:text-white" />
                    </Carousel>
                </div>
            </section>
        </>
    );
}
