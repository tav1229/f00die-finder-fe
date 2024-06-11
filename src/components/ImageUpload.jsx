import { useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { uploadImage, deleteImage } from "../apis/restaurant";
import { Trash } from "lucide-react";

const ImageUpload = ({ fileList, setFileList, fieldName }) => {
    const fileInputRef = useRef(null);

    const handleImageUpload = async (event) => {
        const files = event.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append(fieldName, files[i]);
        }
        try {
            const data = await uploadImage(formData);
            if (data && fieldName in data) {
                setFileList(data[fieldName]);
            } else {
                console.error(
                    `Error: The field '${fieldName}' is not present in the response.`
                );
            }
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    const handleDeleteImage = async (id) => {
        try {
            console.log("Deleting image with id:", id);
            console.log("File list:", fileList);
            await deleteImage(id);
            setFileList(fileList.filter((file) => file.id !== id));
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="flex items-center gap-5">
            <div className="flex items-center gap-5">
                {fileList?.map((file) => (
                    <div key={file.id} className="relative group">
                        <img
                            src={file.url}
                            alt={`Uploaded ${file.id}`}
                            className="relative h-24 w-24 object-cover group-hover:contrast-[0.3] transition-all duration-300 rounded-lg"
                        />
                        <button
                            type="button"
                            className="absolute z-2 top-9 left-9 hidden group-hover:block"
                        >
                            <Trash
                                className="w-5 h-5 text-white"
                                onClick={() => handleDeleteImage(file.id)}
                            />
                        </button>
                    </div>
                ))}
            </div>
            {fileList?.length === 0 && (
                <div className="text-gray-400">No images uploaded</div>
            )}
            {fileList?.length < 6 && (
                <button
                    className="border w-24 h-24 rounded-lg bg-gray-50"
                    type="button"
                    onClick={handleButtonClick}
                >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </button>
            )}
            <input
                type="file"
                multiple
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleImageUpload}
            />
        </div>
    );
};

export default ImageUpload;
