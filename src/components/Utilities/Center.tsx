import Util from "@util/index";
import type { PropsWithChildren } from "react";
import { forwardRef } from "react";

type CenterProps = PropsWithChildren<JSX.IntrinsicElements["div"]>;

const Center = forwardRef<HTMLDivElement, CenterProps>((props, ref) => (
    <div {...props} ref={ref} className={Util.classNames("flex items-center justify-center", props.className)}/>
));

export default Center;