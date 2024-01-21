import { forwardRef, useState } from "react";
import type { PropsWithChildren, ReactNode } from "react";
import Util from "@util/index";
import styles from "@components/Tooltip.module.scss";

type ToolTipProps = PropsWithChildren<{
    content: ReactNode;
    delay?: number;
    direction?: "top" | "bottom" | "left" | "right";
}>;

const Tooltip = forwardRef<HTMLDivElement, ToolTipProps>(({ children, content, delay, direction }, ref) => {
    let timeout: NodeJS.Timeout;
    const [active, setActive] = useState(false);
    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, delay || 400);
    };
    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };
    return (
        <div
            className="inline-block relative"
            // When to show the tooltip
            onMouseEnter={showTip}
            onMouseLeave={hideTip}>
            {/* Wrapping */}
            {children}
            {active && (
                <div className={Util.classNames(styles["tooltip-tip"], styles[direction || "top"])}>
                    {/* Content */}
                    {content}
                </div>
            )}
        </div>
    );
});

export default Tooltip;