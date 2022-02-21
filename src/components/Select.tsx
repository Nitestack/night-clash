import omit from "omit";
import { FC, DetailedHTMLProps, OptionHTMLAttributes, SelectHTMLAttributes } from "react";
const Select: FC<DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & { 
    options: Array<OptionHTMLAttributes<HTMLOptionElement>>;
}> = (props) => {
    return (
        <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
                <select {...omit(["options", "className"], props)}
                    className="coc-description appearance-none block w-full px-3 py-1.5 text-xl font-bold text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                    {props.options.map((optionProps, i) => <option key={i} className="font-bold coc-description" {...optionProps}/>)}
                </select>
            </div>
        </div>
    );
};
export default Select;