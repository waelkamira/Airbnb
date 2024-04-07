import { useForm } from 'react-hook-form';

export default function Input({
  label,
  onChange,
  value,
  symbol = '',
  type = '',
}) {
  const { register } = useForm();
  return (
    <>
      <input
        className="peer w-full transition-all duration-300 placeholder-transparent grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:border-primary outline-none rounded-md px-3 pt-6 text-xl"
        type={type}
        name={label}
        id={label}
        placeholder={label}
        onChange={onChange}
        value={value}
      />
      <label className="absolute text-sm top-2 left-4 peer-placeholder-shown:text-xl peer-placeholder-shown:top-5 peer-focus:text-sm peer-focus:top-2 text-gray-400 transition-all duration-300 ">
        <span className="text-black">{symbol}</span>
        {label}
      </label>
    </>
  );
}
