import Util from "@util/index";
import type { PropsWithChildren } from "react";
import { forwardRef } from "react";

type InputProps = PropsWithChildren<JSX.IntrinsicElements["input"]>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
    <input {...props} ref={ref} className={Util.classNames("font-coc-description text-xl appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg", props.className)}/>
));

export default Input;