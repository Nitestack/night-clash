import omit from "omit";
import type { FC, DetailedHTMLProps, OptionHTMLAttributes, SelectHTMLAttributes } from "react";
import Util from "@util/index";
const Select: FC<DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & { 
    options: Array<OptionHTMLAttributes<HTMLOptionElement>>;
}> = (props) => {
    return (
        <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
                <select {...omit(["options", "className"], props)}
                    className={Util.classNames("font-coc-description appearance-none block w-full px-3 py-1.5 text-xl font-bold text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none", props.className)}>
                    {props.options.map((optionProps, i) => <option key={i} {...optionProps} className={Util.classNames("font-bold font-coc-description", optionProps.className)}/>)}
                </select>
            </div>
        </div>
    );
};
export default Select;