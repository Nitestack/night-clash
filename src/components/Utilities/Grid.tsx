import Util from "@util/index";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { forwardRef } from "react";

const Grid = forwardRef<HTMLDivElement, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>(function(props, ref) {
    const { className } = props;
    return (
        <div {...props} ref={ref} className={Util.classNames("grid", className)}/>
    );
});

export default Grid;