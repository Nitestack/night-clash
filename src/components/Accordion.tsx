import { useRef, useState, forwardRef } from "react";
import type { PropsWithChildren } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Util from "@util/index";
import { useDisclosure } from "@mantine/hooks";

type AccordionProps = PropsWithChildren<{
    title: string;
}>;

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({ title, children }, ref) => {
    const [active, handlers] = useDisclosure(false);
    const [height, setHeight] = useState("0px");
    const [rotate, setRotation] = useState("transform duration-500 ease");
    const contentSpace = useRef<HTMLDivElement>(null);
    function toggleAccordion() {
        return () => {
            handlers.toggle();
            setHeight(active ? "0px" : `${contentSpace.current?.scrollHeight || 0}px`);
            setRotation(active ? "transform duration-500 ease" : "transform duration-500 ease rotate-180");
        };
    };
    return (
        <div ref={ref} className="flex flex-col bg-lightmodeprimary dark:bg-darkmodeprimary p-3 rounded-md my-2">
            <button
                className={Util.classNames("py-6 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between", active ? "border-b-2 border-b-lightmodetext dark:border-b-darkmodetext" : "")}
                onClick={toggleAccordion()}>
                <p className={Util.classNames("inline-block", active ? "text-blue-600" : "")}>{title}</p>
                <ChevronDownIcon className={Util.classNames(rotate, "inline-block w-6")}/>
            </button>
            <div ref={contentSpace} style={{ maxHeight: `${height}` }} className="overflow-hidden transition-max-height duration-500 ease-in-out">
                <div className="py-4"> {children} </div>
            </div>
        </div>
    );
});

export default Accordion;