interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export default function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false
}: FormTextareaProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && '*'}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full p-3  rounded-lg focus:outline-none focus:ring-2 bg-white text-[var(--background)] resize-none"
      />
    </div>
  );
}
