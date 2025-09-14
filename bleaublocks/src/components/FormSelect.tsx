interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Sélectionner...",
  required = false
}: FormSelectProps) {
  return (
    <div>
      <label className="block text-lm font-medium mb-1">
        {label} {required && '*'}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3  rounded-lg focus:outline-none focus:ring-2 bg-white text-[var(--background)]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
