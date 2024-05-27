import Navigation from "./Navigation";
import { useState } from "react";
import { Image, Upload, Button } from "antd";
import Img from "../../assets/images/bg.png";
import { Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
export default function BookingManagement() {
    const [imageUrl, setImageUrl] = useState(Img);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([
        {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-2",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-3",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
    ]);
    const handleUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.error) {
                console.error(
                    "An error occurred while reading the file:",
                    reader.error
                );
            } else {
                setImageUrl(reader.result);
            }
        };

        reader.readAsDataURL(file);

        // Prevent upload
        return false;
    };
    const handlePreview = async (file) => {
        console.log("111111111111111111")
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChangeList = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log("newFileList", newFileList)
    }
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none",
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
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
                        <form className="flex flex-col gap-2 w-full">
                            <div className="flex items-center gap-10">
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
                                        <button type="button" className="px-4 py-2 border border-gray-300 hover:text-[#d02028] hover:border-[#d02028] rounded-sm">
                                            Cập nhật Logo nhà hàng
                                        </button>
                                    </Upload>
                                    <p className="text-[10px]">
                                        Dạng file .jpg, .jpeg, .png, kích thước
                                        tối ưu 100x60 pixel.
                                    </p>
                                </div>
                            </div>

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
                                    className="border border-[#CCCCCC] rounded-sm h-10 outline-none text-gray-700 font-medium text-sm block min-w-full px-5 resize-y"
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
                                    className="border border-[#CCCCCC] rounded-sm h-10 outline-none text-gray-700 font-medium text-sm block min-w-full px-5 resize-y"
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
                                        defaultValue={["a10", "c12"]}
                                        onChange={handleChange}
                                        options={options}
                                    />
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
                                        defaultValue={["a10", "c12"]}
                                        onChange={handleChange}
                                        options={options}
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
                                        id="additionalServices"
                                        mode="multiple"
                                        className="h-10"
                                        allowClear
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Please select"
                                        defaultValue={["a10", "c12"]}
                                        onChange={handleChange}
                                        options={options}
                                    />
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
                                        type="text"
                                        className="border border-[#CCCCCC] rounded-sm h-10 outline-none text-gray-700 font-medium text-sm block min-w-full px-5 resize-y"
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
                                        defaultValue={"a10"}
                                        onChange={handleChange}
                                        options={options}
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
                                        defaultValue={["a10", "c12"]}
                                        onChange={handleChange}
                                        options={options}
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
                                    className="border border-[#CCCCCC] rounded-sm outline-none text-gray-700 font-medium text-sm block min-w-full px-5"
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
                                    className="border border-[#CCCCCC] rounded-sm outline-none text-gray-700 font-medium text-sm block min-w-full px-5"
                                ></textarea>
                            </div>

                            <div className="flex flex-col gap-1 pt-1 w-full">
                                <label
                                    htmlFor="description"
                                    className="min-w-[140px] font-medium text-sm"
                                >
                                    Mô tả nhà hàng
                                </label>
                                <textarea
                                    id="description"
                                    rows="5"
                                    placeholder="Món ăn đặc biệt"
                                    type="text"
                                    className="border border-[#CCCCCC] rounded-sm outline-none text-gray-700 font-medium text-sm block min-w-full px-5"
                                />
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
                                    className="border border-[#CCCCCC] rounded-sm outline-none text-gray-700 font-medium text-sm block min-w-full px-5"
                                ></textarea>
                            </div>

                            <div className="flex flex-col gap-1 pt-1 w-full">
                                <h3 className="min-w-[140px] font-medium text-sm">Ảnh review nhà hàng (Tối đa 6)</h3>
                                <Upload
                                    accept="image/*"
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChangeList}
                                >
                                    {fileList.length >= 6 ? null : uploadButton}
                                </Upload>
                                {previewImage && (
                                    <Image
                                        wrapperStyle={{
                                            display: "none",
                                        }}
                                        preview={{
                                            visible: previewOpen,
                                            onVisibleChange: (visible) =>
                                                setPreviewOpen(visible),
                                            afterOpenChange: (visible) =>
                                                !visible && setPreviewImage(""),
                                        }}
                                        src={previewImage}
                                    />
                                )}
                            </div>
                        </form>
                    </aside>
                </div>
            </div>
        </section>
    );
}
