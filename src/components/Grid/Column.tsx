import { FC } from "react";
import { ColProps } from "react-bootstrap";
import BSCol from "react-bootstrap/Col";
import Util from "@util/index";

const Column: FC<ColProps> = (props) => {
    return (
        <BSCol {...props} className={Util.classNames("p-0", props.className)}/>
    );
};
export default Column;