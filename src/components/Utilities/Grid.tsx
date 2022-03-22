import Util from "@util/index";
import type { PropsWithChildren } from "react";
import { forwardRef } from "react";

type GridProps = PropsWithChildren<JSX.IntrinsicElements["div"]>;

const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
    const { className } = props;
    return (
        <div {...props} ref={ref} className={Util.classNames("grid", className)}/>
    );
});

export default Grid;