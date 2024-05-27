export default function AtomDropdown({
    onChange,
    options,
    value,
    className,
    id,
}) {
    return (
        <select
            id={id}
            onChange={onChange}
            value={value}
            className={`bg-gray-50 cursor-pointer w-[172px] font-medium border border-[#CCCCCC] h-[38px] outline-none text-gray-700 text-sm rounded-md  block p-2 ${className}`}
        >
            {options.map((option, index) => (
                <option
                    className="text-medium text-gray-800"
                    key={index}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}
