import omit from "omit";
import type { DetailedHTMLProps, OptionHTMLAttributes, SelectHTMLAttributes, PropsWithChildren } from "react";
import Util from "@util/index";
import { forwardRef } from "react";

const Select = forwardRef<HTMLSelectElement, PropsWithChildren<DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & { options: Array<OptionHTMLAttributes<HTMLOptionElement>>; }>>((props, ref) => (
    <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
            <select {...omit(["options"], props)} ref={ref}
                className={Util.classNames("font-coc-description appearance-none block w-full px-3 py-1.5 text-xl font-bold text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none", props.className)}>
                {props.options.map((optionProps, i) => <option key={i} {...optionProps} className={Util.classNames("font-bold font-coc-description", optionProps.className)}/>)}
            </select>
        </div>
    </div>
));

export default Select;