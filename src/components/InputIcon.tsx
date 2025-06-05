interface InputIconProps {
  icon: string;
  type: string;
  placeHolder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputIcon = ({
  icon,
  type,
  placeHolder,
  name,
  value,
  onChange,
}: InputIconProps) => {
  return (
    <div className="flex items-center border focus-within:border-cyan-400 rounded-full overflow-hidden w-full bg-white px-8 py-2">
      <div>
        <img className="w-8 h-8" src={icon} alt="" />
      </div>
      <div className="w-px h-6 bg-gray-300 mx-3"></div>
      <input
        type={type}
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={onChange}
        className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
      />
    </div>
  );
};

export default InputIcon;
