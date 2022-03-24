import Util from "@util/index";
import type { PropsWithChildren, ReactNode } from "react";
import { forwardRef } from "react";
import { useDisclosure } from "@mantine/hooks";

type ToolTipProps = PropsWithChildren<{ 
    toolTipNode: ReactNode, 
    className?: string; 
}>;

const Tooltip = forwardRef<HTMLDivElement, ToolTipProps>(function ({ className, toolTipNode, children }, ref) {
    const [toolTip, handlers] = useDisclosure(false);
    function showToolTip() {
        return () => handlers.open();
    };
    function hideToolTip() {
        return () => handlers.close();
    };
    return (
        <>
            <div className={Util.classNames("relative flex flex-col items-center", className)}
            onMouseEnter={showToolTip()}
            onMouseLeave={hideToolTip()}>
                {children}
                {toolTip ? 
                <div ref={ref} role="tooltip" className="z-20 mb-6 bottom-0 absolute flex flex-col items-center transition duration-150 ease-in-out shadow-lg">      
                    <div className="bg-lightmodesecondary dark:bg-darkmodesecondary p-2 rounded">
                        {toolTipNode}
                    </div>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-lightmodesecondary dark:bg-darkmodesecondary"/>
                </div> : undefined}
            </div>
        </>
    );
});

export default Tooltip;