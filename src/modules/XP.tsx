import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import Util from "@util/index";
import styles from "@modules/XP.module.scss";

const XP: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    cr?: boolean,
    expLevel: number
}> = (props) => {
    return (
        <div {...props} className={Util.classNames(props.className, styles.xp, props.cr ? styles[props.expLevel >= Util.Constants.CR.maxLevel ? "cr-max" : "cr"] : styles.coc)}>{props.expLevel}</div>
    );
};
export default XP;