import Util from "@util/index";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import omit from "omit";

const Grid: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    cols?: number | "auto",
    rows?: number | "auto"
}> = (props) => {
    const { className, cols, rows } = props;
    return (
        <div {...omit(["cols", "rows"], props)} className={Util.classNames("grid", className)}/>
    );
};
export default Grid;