import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

const Input: FC<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = (props) => {
    return (
        <input className="coc-description text-xl appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg" {...props}/>
    );
};
export default Input;