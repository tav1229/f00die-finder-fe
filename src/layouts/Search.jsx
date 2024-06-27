import AtomDropdown from "@/components/Atoms/AtomDropdown";
import { useState, useEffect } from "react";
import { MdLocationPin } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { getProvinceOrCity } from "@/apis/location";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchA() {
    const [searchValue, setSearchValue] = useState("");
    const [provinceOrCity, setProvinceOrCity] = useState("");
    const [provinceOrCitys, setProvinceOrCitys] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
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

        if (searchParams.has("searchValue")) {
            setSearchValue(searchParams.get("searchValue"));
        }

        fetchProvinceOrCitys();
    }, []);

    const filterQueryParams = () => {
        let query = "";
        if (provinceOrCity) {
            query += `&provinceOrCityId=${provinceOrCity}`;
        }
        if (searchValue) {
            query += `&searchValue=${searchValue}`;
        }
        return query;
    }

    return (
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
                        value={searchValue}
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
    );
}
