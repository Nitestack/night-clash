import Util from "@util/index";
import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";
import { forwardRef } from "react";

const Center = forwardRef<HTMLDivElement, PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>>((props, ref) => {
    return (
        <div {...props} ref={ref} className={Util.classNames("flex items-center justify-center", props.className)}/>
    );
});

export default Center;