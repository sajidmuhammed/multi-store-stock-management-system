import Input from "./Input";

interface SearchInputProps {
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <div className="w-full md:w-80">
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}