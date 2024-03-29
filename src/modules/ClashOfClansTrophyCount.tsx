import type { FC } from "react";
import Util from "@util/index";
import omit from "omit";

const ClashOfClansTrophyCount: FC<JSX.IntrinsicElements["div"] & {
    trophyCount?: number,
    village?: "home" | "builder",
    cursed?: boolean,
    trophyCountProps?: JSX.IntrinsicElements["p"],
    imgClassName?: string
}> = (props) => {
    const { trophyCount, village, cursed } = props;
    const newVillage = village || "home";
    return (
        <div {...omit(["trophyCount", "village", "trophyCountProps", "imgClassName", "cursed"], props)} className={Util.classNames("flex items-center whitespace-nowrap", props.className)}>
            {!cursed ? <p {...props.trophyCountProps}>{trophyCount}</p> : undefined}
            <img className={Util.classNames("w-5", props.imgClassName)} src={`/Images/Clash of Clans/${Util.toCapitalize(newVillage)}/Trophies.png`}/>
            {cursed ? <p {...props.trophyCountProps}>{trophyCount}</p> : undefined}
        </div>
    );
};
export default ClashOfClansTrophyCount;