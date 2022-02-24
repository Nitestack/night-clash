import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, FC } from "react";

const Accordion: FC<{
    title: string;
}> = ({ title, children }) => {
    const [active, setActive] = useState(false);
    const [height, setHeight] = useState("0px");
    const [rotate, setRotate] = useState("transform duration-500 ease");
    const contentSpace = useRef<HTMLDivElement>(null);
    return (
        <div className="flex flex-col bg-lightmodeprimary dark:bg-darkmodeprimary p-3 rounded-md my-2">
            <button
                className={"py-6 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between" + (active ? " border-b-2 border-b-lightmodetext dark:border-b-darkmodetext" : "")}
                onClick={() => {
                    setActive(active == false ? true : false);
                    setHeight(active ? "0px" : `${contentSpace.current?.scrollHeight || 0}px`);
                    setRotate(active ? "transform duration-500 ease" : "transform duration-500 ease rotate-180");
                }}>
                <p className={"inline-block" + (active ? "text-blue-600" : "")}>{title}</p>
                <FontAwesomeIcon icon={faChevronDown} className={`${rotate} inline-block`}/>
            </button>
            <div ref={contentSpace} style={{ maxHeight: `${height}` }} className="overflow-hidden transition-max-height duration-500 ease-in-out">
                <div className="py-4">{children}</div>
            </div>
        </div>
    );
};

export default Accordion;