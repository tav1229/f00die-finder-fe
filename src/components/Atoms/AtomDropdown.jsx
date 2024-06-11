export default function AtomDropdown({
    onChange,
    options,
    value,
    className,
    id,
}) {
    // Hàm mới để xử lý sự kiện onChange và tìm id tương ứng
    const handleChange = (event) => {
        // Tìm option dựa trên name
        const selectedOption = options.find(
            (option) => option.name === event.target.value
        );
        // Gọi hàm onChange ban đầu với id của option được chọn
        onChange(selectedOption.id);
    };

    return (
        <select
            onChange={handleChange} // Sử dụng hàm handleChange mới
            className={`bg-gray-50 cursor-pointer min-w-[172px] font-medium border border-[#CCCCCC] h-[38px] outline-none text-gray-700 text-sm rounded-md  block px-2 ${className}`}
        >

            {options?.map((option, index) => (
                <option
                    selected={option.id === value}
                    className="text-medium text-gray-800"
                    key={index} // Sử dụng id làm key thay vì index
                    value={option.name} // Sử dụng name làm giá trị
                >
                    {option.name}
                </option>
            ))}
        </select>
    );
}
