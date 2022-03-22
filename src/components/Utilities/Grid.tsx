import Util from "@util/index";
import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";
import { forwardRef } from "react";

const Grid = forwardRef<HTMLDivElement, PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>>((props, ref) => {
    const { className } = props;
    return (
        <div {...props} ref={ref} className={Util.classNames("grid", className)}/>
    );
});

export default Grid;