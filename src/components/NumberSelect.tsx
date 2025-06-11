import CreatableSelect from "react-select/creatable";

interface NumberSelectProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  options: number[];
  isClearable?: boolean;
}

const NumberSelect: React.FC<NumberSelectProps> = ({
  label,
  value,
  onChange,
  options,
  isClearable = true,
}) => {
  const formattedOptions = options.map((num) => ({
    label: num.toString(),
    value: num,
  }));

  const handleChange = (option: { label: string; value: number } | null) => {
    if (option) {
      onChange(option.value);
    } else {
      onChange(0);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base18 font-medium dark:text-white">{label}</h3>
      <div className="min-w-32 w-full">
        <CreatableSelect
          isClearable={isClearable}
          options={formattedOptions}
          onChange={handleChange}
          value={{ label: value.toString(), value }}
          classNamePrefix="react-select"
        />
      </div>
    </div>
  );
};

export default NumberSelect;
