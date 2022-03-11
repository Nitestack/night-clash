import Button from "@components/Button";
import type { ButtonProps } from "@components/Button";
import Util from "@util/index";
import type { FC } from "react";

const ClashOfClansShareButton: FC<ButtonProps> = (props) => {
    return (
        <Button {...props} className={Util.classNames("bg-blue-700 p-0 w-11 h-11", props.className)}>
            <img className="w-10" src="/Images/Clash of Clans/share.png"/>
        </Button>
    );
};
export default ClashOfClansShareButton;