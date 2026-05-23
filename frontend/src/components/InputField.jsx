export default function InputField({ label, type, value, onChange }) {
    return (
        <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
                type= {type}
                value={value}
                onChange={onChange}
                className={"border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"}
            />
        </div>
    )
}