import { FC } from "react";
import { RowProps } from "react-bootstrap";
import BSRow from "react-bootstrap/Row";

const Row: FC<RowProps> = (props) => {
    return (
        <BSRow {...props}/>
    );
};
export default Row;