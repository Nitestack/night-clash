import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import Util from "@util/index";
import omit from "omit";

const ClashOfClansTrophyCount: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    trophyCount?: number,
    village?: "home" | "builder",
    cursed?: boolean
}> = (props) => {
    const { trophyCount, village, cursed } = props;
    const newVillage = village || "home";
    return (
        <div {...omit(["trophyCount", "village"], props)} className={Util.classNames("flex items-center whitespace-nowrap", props.className)}>
            {!cursed ? <p>{trophyCount}</p> : undefined}
            <img className="w-5" src={`/Images/Clash of Clans/${Util.toCapitalize(newVillage)}/Trophies.png`}/>
            {cursed ? <p>{trophyCount}</p> : undefined}
        </div>
    );
};
export default ClashOfClansTrophyCount;