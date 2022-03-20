import Util from "@util/index";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { forwardRef } from "react";

const Center = forwardRef<HTMLDivElement, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>(function(props, ref) {
    return (
        <div {...props} ref={ref} className={Util.classNames("flex items-center justify-center", props.className)}/>
    );
});

export default Center;