import Util from "@util/index";
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";

const Center: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) => {
    return (
        <div {...props} className={Util.classNames("flex items-center justify-center", props.className)}/>
    );
};
export default Center;