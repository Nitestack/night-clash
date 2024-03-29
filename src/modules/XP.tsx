import type { FC } from "react";
import Util from "@util/index";
import styles from "@modules/XP.module.scss";
import omit from "omit";

const XP: FC<JSX.IntrinsicElements["div"] & {
    cr?: boolean,
    expLevel: number
}> = (props) => {
    return (
        <div {...omit(["expLevel", "cr", "className"], props)} className={Util.classNames(props.className, styles.xp, props.cr ? styles[props.expLevel >= Util.Constants.CR.maxLevel ? "cr-max" : "cr"] : styles.coc)}>{props.expLevel}</div>
    );
};
export default XP;