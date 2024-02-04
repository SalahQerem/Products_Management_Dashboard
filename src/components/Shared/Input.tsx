import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: IProps) => {
  return (
    <input
      type="text"
      className="border-[1px] border-gray-300 rounded-lg shadow-md 
         focus:border-indigo-500 focus:outline-none focus:ring-1 
         focus:ring-indigo-500 p-3 text-md"
      {...rest}
    />
  );
};

export default Input;
