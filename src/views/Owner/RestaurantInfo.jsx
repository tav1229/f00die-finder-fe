import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import { Image, Upload, Button, message } from "antd";
import Img from "../../assets/images/bg.png";
import { Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getCustomerType } from "@/apis/type/customerType";
import { getCuisineType } from "@/apis/type/cuisineType";
import { getServingType } from "../../apis/type/servingType";
import { getPriceRangePerPerson } from "../../apis/type/priceRangePerPerson";
import { getProvinceOrCity, getDistrict, getWard } from "@/apis/location";
import { getAdditionalService } from "../../apis/type/additionalService";
import ImageUpload from "../../components/ImageUpload";
import {
    getMyRestaurant,
    createRestaurant,
    updateRestaurant,
} from "../../apis/restaurant";
import AtomDropdown from "@/components/Atoms/AtomDropdown";
import TiptapEditor from "../../components/TiptapEditor";

const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}


const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
export default function BookingManagement() {
    const [imageUrl, setImageUrl] = useState(Img);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const [fileListMenu, setFileListMenu] = useState([]);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [specialDishes, setSpecialDishes] = useState("");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState("");
    const [capacity, setCapacity] = useState("");

    const [cuisineType, setCuisineType] = useState([]);
    const [provinceOrCity, setProvinceOrCity] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    const [servingType, setServingType] = useState([]);
    const [customerType, setCustomerType] = useState(null);
    const [priceRangePerPerson, setPriceRangePerPerson] = useState(null);
    const [additionalService, setAdditionalService] = useState(null);

    const [cuisineTypes, setCuisineTypes] = useState([]);
    const [provinceOrCitys, setProvinceOrCitys] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [servingTypes, setServingTypes] = useState([]);
    const [customerTypes, setCustomerTypes] = useState([]);
    const [priceRangePerPersons, setPriceRangePerPersons] = useState([]);
    const [additionalServices, setAdditionalServices] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const [businessHours, setBusinessHours] = useState([]);

    const timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const timeString = `${hour.toString().padStart(2, "0")}:${minute
                .toString()
                .padStart(2, "0")}`;
            const time = timeString + ":00";
            timeOptions.push({ id: time, name: timeString });
        }
    }

    useEffect(() => {
        const dataBusinessHours = [];
        for (let i = 0; i < 7; i++) {
            dataBusinessHours.push({
                dayOfWeek: i,
                openTime: "00:00:00",
                closeTime: "00:00:00",
            });
        }
        setBusinessHours(dataBusinessHours);

        const fetchMyRestaurant = async () => {
            try {
                const response = await getMyRestaurant();
                if (response == undefined) {
                    setIsCreated(false);
                }
                else {
                    setIsCreated(true);
                }
                

                setName(response.name);
                setPhone(response.phone);
                setAddress(response.location.address);
                setProvinceOrCity(response.provinceOrCity.id);
                setDistrict(response.district.id);
                setWard(response.wardOrCommune.id);

                setCuisineType(
                    response.cuisineTypes.map((cuisineType) => cuisineType.id)
                );
                setServingType(
                    response.servingTypes.map((servingType) => servingType.id)
                );
                setCustomerType(
                    response.customerTypes.map(
                        (customerType) => customerType.id
                    )
                );
                setPriceRangePerPerson(response.priceRangePerPerson?.id);
                setCapacity(response.capacity);
                setSpecialDishes(response.specialDishes);
                setDescription(response.description);
                setNote(response.note);

                setAdditionalService(
                    response.additionalServices.map(
                        (additionalService) => additionalService.id
                    )
                );
                if (response.businessHours.length > 0) {
                    setBusinessHours(response.businessHours);
                }

                setFileList(response.restaurantImages);
                setFileListMenu(response.menuImages);
            } catch (error) {
                console.error(
                    `Error in fetchMyRestaurant request: ${error.message}`
                );
            }
        };

        fetchMyRestaurant();
    }, []);
    useEffect(() => {
        const fetchCuisineTypes = async () => {
            try {
                const response = await getCuisineType();
                setCuisineTypes([...response.data]);
            } catch (error) {
                console.error(
                    `Error in fetchCuisineTypes request: ${error.message}`
                );
            }
        };

        const fetchCustomerTypes = async () => {
            try {
                const response = await getCustomerType();
                setCustomerTypes([...response.data]);
            } catch (error) {
                console.error(
                    `Error in fetchCustomerTypes request: ${error.message}`
                );
            }
        };

        const fetchProvinceOrCitys = async () => {
            try {
                const response = await getProvinceOrCity();
                setProvinceOrCitys([...response.data]);
            } catch (error) {
                console.error(
                    `Error in fetchProvinceOrCitys request: ${error.message}`
                );
            }
        };

        const fetchServingTypes = async () => {
            try {
                const response = await getServingType();
                setServingTypes([...response.data]);
            } catch (error) {
                console.error(
                    `Error in fetchServingTypes request: ${error.message}`
                );
            }
        };

        const fetchPriceRangePerPersons = async () => {
            try {
                const response = await getPriceRangePerPerson();
                setPriceRangePerPersons([...response.data]);
            } catch (error) {
                console.error(
                    `Error in fetchPriceRangePerPersons request: ${error.message}`
                );
            }
        };

        const fetchAdditionalServices = async () => {
            try {
                const response = await getAdditionalService();
                setAdditionalServices([...response.data]);
                console.log("cairespose: ", response.data);
            } catch (error) {
                console.error(
                    `Error in fetchAdditionalServices request: ${error.message}`
                );
            }
        };

        fetchCuisineTypes();
        fetchCustomerTypes();
        fetchProvinceOrCitys();
        fetchServingTypes();
        fetchPriceRangePerPersons();
        fetchAdditionalServices();
    }, []);

    useEffect(() => {
        const fetchDistricts = async (provinceOrCityId) => {
            setDistricts([]);
            try {
                if (!provinceOrCityId) return;
                const response = await getDistrict(provinceOrCityId);
                setDistricts([...response.data]);
            } catch (error) {
                // console.error(
                //     `Error in fetchDistricts request: ${error.message}`
                // );
            }
        };

        fetchDistricts(provinceOrCity);
    }, [provinceOrCity]);

    useEffect(() => {
        const fetchWards = async (districtId) => {
            setWards([]);
            // setWard("");
            try {
                if (!districtId) return;
                const response = await getWard(districtId);
                setWards([...response.data]);
                // setWard("");
            } catch (error) {
                // console.error(`Error in fetchWards request: ${error.message}`);
            }
        };

        fetchWards(district);
    }, [district]);

    const handleChangeServings = (value) => {
        setServingType(value);
    };
    const handleChangeCuisines = (value) => {
        setCuisineType(value);
        console.log("cuisineType change", cuisineType);
    };
    const handleChangePriceRangePerPersons = (value) => {
        setPriceRangePerPerson(value);
    };
    const handleChangeCustomerTypes = (value) => {
        setCustomerType(value);
    };
    const handleChangeProvinceOrCitys = (value) => {
        setProvinceOrCity(value);
    };
    const handleChangeDistricts = (value) => {
        setDistrict(value);
    };
    const handleChangeWards = (value) => {
        setWard(value);
    };
    const handleChangeAdditionalServices = (value) => {
        setAdditionalService(value);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const dataSend = {
            name: name,
            phone: phone,
            priceRangePerPerson: priceRangePerPerson,
            capacity: capacity,
            specialDishes: specialDishes,
            description: description,
            note: note,
            cuisineTypes: cuisineType,
            servingTypes: servingType,
            customerTypes: customerType,
            address: address,
            ward: ward,
            additionalServices: additionalService,
            businessHours: businessHours,
        };

        try {
            if (isCreated) {
                await updateRestaurant(dataSend);
                message.success("Cập nhật thông tin nhà hàng thành công!");
            } else {
                await createRestaurant(dataSend);
                message.success("Tạo nhà hàng thành công!");
            }
        } catch (error) {
            message.error("Có lỗi xảy ra: " + error.message);
        }
    };

    return (
        <section className="flex justify-center bg-[#EEEEEE] w-full">
            <div className="grid grid-cols-5 gap-4 w-full p-4 max-w-[1280px] min-h-screen">
                <div className="col-span-1 h-auto">
                    <Navigation />
                </div>
                <div className="col-span-4 flex flex-col rounded-md bg-white py-3 px-5">
                    <h1 className="text-lg font-semibold">
                        Thông tin nhà hàng
                    </h1>

                    <aside className="w-full py-5">
                        <form
                            onSubmit={handleOnSubmit}
                            className="flex flex-col gap-2 w-full"
                        >
                            {/* <div className="flex items-center gap-10">
                                <Image
                                    width="100px"
                                    height="60px"
                                    className="object-cover rounded-sm"
                                    src={imageUrl}
                                />
                                <div className="flex flex-col gap-1">
                                    <Upload
                                        accept="image/*"
                                        beforeUpload={handleUpload}
                                        showUploadList={false}
                                    >
                                        <button
                                            type="button"
                                            className="px-4 py-2 border border-gray-300 hover:text-[#d02028] hover:border-[#d02028] rounded-sm"
                                        >
                                            Cập nhật Logo nhà hàng
                                        </button>
                                    </Upload>
                                    <p className="text-[10px]">
                                        Dạng file .jpg, .jpeg, .png, kích thước
                                        tối ưu 100x60 pixel.
                                    </p>
                                </div>
                            </div> */}

                            <div className="flex flex-col gap-1 pt-5 w-full">
                                <label
                                    htmlFor="name"
                                    className="min-w-[140px] font-medium text-sm"
                                >
                                    Tên nhà hàng
                                </label>
                                <input
                                    id="name"
                                    placeholder="Tên nhà hàng"
                                    type="text"
                                    value={name}
                                    className="border border-[#CCCCCC] rounded-sm h-10 outline-none text-gray-700 font-medium text-sm block min-w-full px-5 resize-y"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-1 pt-1 w-full">
                                <label
                                    htmlFor="phone"
                                    className="min-w-[140px] font-medium text-sm"
                                >
                                    Số điện thoại
                                </label>
                                <input
                                    id="phone"
                                    placeholder="Số điện thoại"
                                    type="text"
                                    value={phone}
                                    className="border border-[#CCCCCC] rounded-sm h-10 outline-none text-gray-700 font-medium text-sm block min-w-full px-5 resize-y"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col gap-1 pt-1">
                                    <label
                                        htmlFor="servingTypes"
                                        className="min-w-[140px] font-medium text-sm"
                                    >
                                        Loại hình phục vụ
                                    </label>
                                    <Select
                                        id="servingTypes"
                                        mode="multiple"
                                        className="h-10"
                                        allowClear
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Please select"
                                        value={servingType}
                                        onChange={handleChangeServings}
                                        options={servingTypes.map(
                                            (servingType) => ({
                                                label: servingType.name,
                                                value: servingType.id,
                                            })
                                        )}
                                    />
                                    {/* <MultiSelect
                                        checkIconPosition="right"
                                        searchable
                                        data={servingTypes?.map(
                                            (servingType) => ({
                                                value: servingType.id,
                                                label: servingType.name,
                                            })
                                        )}
                                        value={servingType}
                                        onChange={handleChangeServings}
                                    /> */}
                                </div>
                                <div className="flex flex-col gap-1 pt-1">
                                    <label
                                        htmlFor="cuisineTypes"
                                        className="min-w-[140px] font-medium text-sm"
                                    >
                                        Loại hình ẩm thực
                                    </label>
                                    <Select
                                        id="cuisineTypes"
                                        mode="multiple"
                                        className="h-10"
                                        allowClear
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Please select"
                                        value={cuisineType}
                                        onChange={handleChangeCuisines}
                                        options={cuisineTypes?.map(
                                            (cuisineType) => ({
                                                label: cuisineType.name,
                                                value: cuisineType.id,
                                            })
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 pt-1">
                                    <label
                                        htmlFor="additionalServices"
                                        className="min-w-[140px] font-medium text-sm"
                                    >
                                        Dịch vụ khác
                                    </label>
                                    <Select
                                        mode="multiple"
                                        className="h-10"
                                        allowClear
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Please select"
                                        value={additionalService}
                                        onChange={
                                            handleChangeAdditionalServices
                                        }
                                        options={additionalServices?.map(
                                            (additional) => ({
                                                label: additional.name,
                                                value: additional.id,
                                            })
                                        )}
                                    />
                                    {/* <MultiSelect
                                        checkIconPosition="right"
                                        searchable
                                        data={additionalServices?.map(
                                            (additionalService) => ({
                                                value: additionalService.id,
                                                label: additionalService.name,
                                            })
                                        )}
                                        value={additionalService}
                                        onChange={
                                            handleChangeAdditionalServices
                                        }
                                    /> */}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col gap-1 pt-1">
                                    <label
                                        htmlFor="capacity"
                                        className="min-w-[140px] font-medium text-sm"
                                    >
                                        Sức chứa
                                    </label>
                                    <input
                                        id="capacity"
                                        placeholder="Sức chứa"
                                        type="number"
                                        value={capacity}
                                        className="border border-[#CCCCCC] rounded-sm h-10 outline-none text-gray-700 font-medium text-sm block min-w-full px-5 resize-y"
                                        onChange={(e) =>
                                            setCapacity(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-1 pt-1">
                                    <label
                                        htmlFor="priceRangePerPerson"
                                        className="min-w-[140px] font-medium text-sm"
                                    >
                                        Giá trung bình/người
                                    </label>
                                    <Select
                                        id="priceRangePerPerson"
                                        className="h-10"
                                        allowClear
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Please select"
                                        value={priceRangePerPerson}
                                        onChange={
                                            handleChangePriceRangePerPersons
                                        }
                                        options={priceRangePerPersons.map(
                                            (priceRange) => ({
                                                label: priceRange.name,
                                                value: priceRange.id,
                                            })
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 pt-1">
                                    <label
                                        htmlFor="customerTypes"
                                        className="min-w-[140px] font-medium text-sm"
                                    >
                                        Loại hình khách hàng
                                    </label>
                                    <Select
                                        id="customerTypes"
                                        mode="multiple"
                                        className="h-10"
                                        allowClear
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Please select"
                                        value={customerType}
                                        onChange={handleChangeCustomerTypes}
                                        options={customerTypes.map(
                                            (customerType) => ({
                                                label: customerType.name,
                                                value: customerType.id,
                                            })
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col gap-1 pt-1">
                                    <label
                                        htmlFor="priceRangePerPerson"
                                        className="min-w-[140px] font-medium text-sm"
                                    >
                                        Tỉnh/Thành phố
                                    </label>
                                    <Select
                                        id="provinceOrCity"
                                        className="h-10"
                                        allowClear
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Please select"
                                        value={provinceOrCity}
                                        onChange={handleChangeProvinceOrCitys}
                                        options={provinceOrCitys.map(
                                            (provinceOrCity) => ({
                                                label: provinceOrCity.name,
                                                value: provinceOrCity.id,
                                            })
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 pt-1">
                                    <label
                                        htmlFor="priceRangePerPerson"
                                        className="min-w-[140px] font-medium text-sm"
                                    >
                                        Quận/Huyện
                                    </label>
                                    <Select
                                        id="district"
                                        className="h-10"
                                        allowClear
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Please select"
                                        value={district}
                                        onChange={handleChangeDistricts}
                                        options={districts.map((district) => ({
                                            label: district.name,
                                            value: district.id,
                                        }))}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 pt-1">
                                    <label
                                        htmlFor="priceRangePerPerson"
                                        className="min-w-[140px] font-medium text-sm"
                                    >
                                        Phường/Xã
                                    </label>
                                    <Select
                                        id="ward"
                                        className="h-10"
                                        allowClear
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Please select"
                                        value={ward}
                                        onChange={handleChangeWards}
                                        options={wards.map((ward) => ({
                                            label: ward.name,
                                            value: ward.id,
                                        }))}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 pt-1 w-full">
                                <label
                                    htmlFor="address"
                                    className="min-w-[140px] font-medium text-sm"
                                >
                                    Địa chỉ nhà hàng
                                </label>
                                <textarea
                                    id="address"
                                    placeholder="Địa chỉ nhà hàng"
                                    rows="2"
                                    type="text"
                                    value={address}
                                    className="border border-[#CCCCCC] rounded-sm outline-none text-gray-700 font-medium text-sm block min-w-full px-5"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-1 pt-1 w-full">
                                <label
                                    htmlFor="specialDishes"
                                    className="min-w-[140px] font-medium text-sm"
                                >
                                    Món ăn đặc biệt
                                </label>
                                <textarea
                                    id="specialDishes"
                                    rows="3"
                                    placeholder="Món ăn đặc biệt"
                                    type="text"
                                    value={specialDishes}
                                    className="border border-[#CCCCCC] rounded-sm outline-none text-gray-700 font-medium text-sm block min-w-full px-5"
                                    onChange={(e) =>
                                        setSpecialDishes(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex flex-col gap-1 pt-1 w-full">
                                <label
                                    htmlFor="description"
                                    className="min-w-[140px] font-medium text-sm"
                                >
                                    Mô tả nhà hàng
                                </label>
                                <TiptapEditor content={description} setContent={setDescription}/>
                                {/* <textarea
                                    id="description"
                                    rows="5"
                                    placeholder="Món ăn đặc biệt"
                                    type="text"
                                    value={description}
                                    className="border border-[#CCCCCC] rounded-sm outline-none text-gray-700 font-medium text-sm block min-w-full px-5"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                /> */}
                            </div>

                            <div className="flex flex-col gap-1 pt-1 w-full">
                                <label
                                    htmlFor="note"
                                    className="min-w-[140px] font-medium text-sm"
                                >
                                    Ghi chú
                                </label>
                                <textarea
                                    id="note"
                                    rows="3"
                                    placeholder="Món ăn đặc biệt"
                                    type="text"
                                    value={note}
                                    className="border border-[#CCCCCC] rounded-sm outline-none text-gray-700 font-medium text-sm block min-w-full px-5"
                                    onChange={(e) => setNote(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="flex flex-col gap-3 mt-2 text-sm">
                                <h5>Thời gian hoạt động</h5>
                                {businessHours?.map((businessHour, index) => (
                                    <div
                                        className="flex items-center gap-2"
                                        key={index}
                                    >
                                        <span className="w-[80px]">
                                            {days[businessHour.dayOfWeek]}:
                                        </span>
                                        <span>Giờ bắt đầu:</span>
                                        <AtomDropdown
                                            value={businessHour.openTime}
                                            onChange={(value) => {
                                                const newBusinessHours = [
                                                    ...businessHours,
                                                ];
                                                newBusinessHours[
                                                    index
                                                ].openTime = value;
                                                setBusinessHours(
                                                    newBusinessHours
                                                );
                                            }}
                                            options={timeOptions}
                                        />
                                        <span className="ml-10">
                                            Giờ kết thúc:
                                        </span>
                                        <AtomDropdown
                                            value={businessHour.closeTime}
                                            onChange={(value) => {
                                                const newBusinessHours = [
                                                    ...businessHours,
                                                ];
                                                newBusinessHours[
                                                    index
                                                ].closeTime = value;
                                                setBusinessHours(
                                                    newBusinessHours
                                                );
                                            }}
                                            options={timeOptions}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-1 pt-1 w-full">
                                <h3 className="min-w-[140px] font-medium text-sm">
                                    Ảnh review nhà hàng (Tối đa 6)
                                </h3>
                                <ImageUpload
                                    fileList={fileList}
                                    setFileList={setFileList}
                                    fieldName="restaurantImages"
                                />
                            </div>
                            <div className="flex flex-col gap-1 pt-1 w-full">
                                <h3 className="min-w-[140px] font-medium text-sm">
                                    Ảnh Menu nhà hàng (Tối đa 6)
                                </h3>
                                <ImageUpload
                                    fileList={fileListMenu}
                                    setFileList={setFileListMenu}
                                    fieldName="menuImages"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-[#D02028] text-white font-medium h-10 w-full rounded-md text-sm mt-4"
                            >
                                Xác nhận
                            </button>
                        </form>
                    </aside>
                </div>
            </div>
        </section>
    );
}
