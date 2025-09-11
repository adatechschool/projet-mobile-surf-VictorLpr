interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  step?: string;
  helpText?: string;
}

export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  step,
  helpText
}: FormInputProps) {
  return (
    <div>
      <label className="block text-lm font-medium mb-1">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        step={step}
        required={required}
        className="w-full p-3 border border-[var(--thirdcolor)] rounded-lg focus:outline-none focus:ring-2 bg-white text-[var(--background)]"
      />
      {helpText && (
        <p className="text-sm opacity-90 mt-1">{helpText}</p>
      )}
    </div>
  );
}
