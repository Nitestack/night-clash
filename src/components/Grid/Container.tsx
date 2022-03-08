import { FC } from "react";
import { ContainerProps } from "react-bootstrap";
import BSContainer from "react-bootstrap/Container";

const Container: FC<ContainerProps> = (props) => {
    return (
        <BSContainer {...props}/>
    );
};
export default Container;