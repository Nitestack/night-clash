import type { FC, ReactNode } from "react";
import Util from "@util/index";
import omit from "omit";

const AccountBody: FC<{ 
    categories: {
        [key: string]: {
            headerProps?: JSX.IntrinsicElements["dt"],
            content?: ReactNode
        }
    }
}> = ({ categories }) => {
    return (
        <div className="border-t border-b border-gray-200">
            <dl>
                {Object.keys(categories).map(key => {
                    const category = categories[key];
                    const { headerProps, content } = category;
                    return (
                        <div key={key} className="bg-lightmodeprimary dark:bg-darkmodeprimary px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <div className="flex items-center">
                                <dt 
                                {...(headerProps ? omit("children", headerProps) : headerProps)} 
                                className={Util.classNames("text-sm font-medium text-gray-500", headerProps?.className ? headerProps.className : undefined)}> {key} </dt>
                                {headerProps?.children}
                            </div>
                            {content}
                        </div>
                    );
                })}
            </dl>
        </div>
    );
};
export default AccountBody;