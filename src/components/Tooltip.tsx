import Util from "@util/index";
import { FC, ReactNode, useState } from "react";

const Tooltip: FC<{ 
    toolTipNode: ReactNode,
    className?: string;
}> = ({ children, toolTipNode, className }) => {
    const [toolTip, setToolTip] = useState(false);
    function showToolTip() {
        return () => setToolTip(true);
    };
    function hideToolTip() {
        return () => setToolTip(false);
    };
    return (
        <>
            <div className={Util.classNames("relative flex flex-col items-center", className)}
            onMouseEnter={showToolTip()}
            onMouseLeave={hideToolTip()}>
                {children}
                {toolTip ? 
                <div role="tooltip" className="z-20 mb-6 bottom-0 absolute flex flex-col items-center transition duration-150 ease-in-out shadow-lg">      
                    <div className="bg-lightmodesecondary dark:bg-darkmodesecondary p-2 rounded">
                        {toolTipNode}
                    </div>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-lightmodesecondary dark:bg-darkmodesecondary"></div>
                </div> : undefined}
            </div>
        </>
    );
};
export default Tooltip;