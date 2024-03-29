import { forwardRef } from "react";
import { Tab } from "@headlessui/react";
import Util from "@util/index";

const Tabs = forwardRef<HTMLDivElement, { tabs: { [key: string]: JSX.Element; }; initialTabIndex?: number; onTabChange?: (index: number) => void; }>(({ tabs, initialTabIndex, onTabChange }, ref) => (
    <div ref={ref} className="w-full sm:p-0 bg-lightmodeprimary dark:bg-darkmodeprimary rounded-lg">
        <Tab.Group defaultIndex={initialTabIndex} onChange={(index) => {
            if (onTabChange) onTabChange(index);
        }}>
            <Tab.List className="flex p-1 space-x-1 rounded-xl overflow-x-auto">
                {Object.keys(tabs).map((category) => (
                    <Tab
                        key={category}
                        className={({ selected }) =>
                            Util.classNames(
                                "w-full p-2.5 text-sm sm:text-base leading-5 font-medium text-blue-700 rounded-lg",
                                "focus:bg-lightmodetext dark:focus:bg-darkmodetext",
                                selected ? "bg-lightmodetext dark:bg-darkmodetext shadow" : "bg-lightmodeprimary dark:bg-darkmodeprimary text-blue-100 hover:bg-white/[0.12] hover:text-white"
                            )
                        }>
                        {category}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
                {Object.values(tabs).map((content, index) => (
                    <Tab.Panel
                        key={index}
                        className="bg-lightmodeprimary dark:bg-darkmodeprimary rounded-xl p-1 sm:p-2 md:p-3">
                        {content}
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    </div>
));

export default Tabs;