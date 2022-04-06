import type { FC } from "react";
import Util from "@util/index";

const AccountHeader: FC<{ 
    header: string, 
    description: string, 
    h3Props?: JSX.IntrinsicElements["h3"],
    pProps?: JSX.IntrinsicElements["p"]
}> = ({ header, description, h3Props, pProps }) => {
    return (
        <div className="px-4 py-5 sm:px-6">
            <h3 {...h3Props} className={Util.classNames("text-lg leading-6 font-medium", h3Props?.className)}> {header} </h3>
            <p {...pProps} className={Util.classNames("mt-1 max-w-2xl text-lg text-gray-500 font-coc-description", pProps?.className)}> {description} </p>
        </div>
    );
};
export default AccountHeader;