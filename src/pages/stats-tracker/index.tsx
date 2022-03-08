import { NextPageWithConfiguration } from "@util/types";
import { FC, useRef } from "react";
import Center from "@components/Center";
import Tabs from "@components/Tabs";
import Util from "@util/index";
import PlayerTagInput from "@modules/PlayerTagInput";

const StatsTracker: NextPageWithConfiguration = () => {
    const tracker = ["clashofclans", "clashroyale", "brawlstars"];
    if (!location.hash) location.hash = `#${tracker[0]}`;
    const defaultIndex = tracker.includes(location.hash.replace(/#/g, "")) ? tracker.indexOf(location.hash.replace(/#/g, "")) : 0;
    return (
        <>
            <Tabs initialTabIndex={defaultIndex} tabs={{
                "Clash of Clans" : <Tab backgroundImageName="Clash of Clans" hash="home"/>,
                "Clash Royale": <Tab backgroundImageName="Clash Royale"/>,
                "Brawl Stars": <Tab backgroundImageName="Brawl Stars" club/>
            }} onTabChange={(index) => {
                location.hash = `#${tracker[index]}`;
            }}/>
        </>
    );
    
};

const Tab: FC<{
    club?: boolean,
    backgroundImageName: string,
    hash?: string
}> = ({ club, backgroundImageName, hash }) => {
    const tabs: { [key: string]: JSX.Element } = {};
    const tracker = backgroundImageName.toLowerCase().replace(/ /g, "");
    function redirectToTracker(classID: string, element: string) {
        return () => {
            const tag = $(`#${classID}`).val() as string;
            if (tag && tag.length < 12 && tag.length >= 7) {
                window.open(`/stats-tracker/${tracker}/${(element == "clan" ? (club ? "club" : element) : element) + "s"}/${tag.replace(/#/g, "")}${hash ? `#${hash}` : ""}`, "_blank");
            };
        };
    };
    for (const element of ["player", "clan"]) {
        const id = `${tracker}${Util.toCapitalize(element == "clan" ? (club ? "club" : element) : element)}`;
        tabs[`Find a ${element == "clan" ? (club ? "club" : element) : element}`] = 
        <>
            <Center>
                <img className="w-[60vw]" src={`/Images/${backgroundImageName}.png`}/>
            </Center>
            <Center>
                <PlayerTagInput inputProps={{
                    id: id
                }} searchButtonProps={{
                    onClick: redirectToTracker(id, element)
                }} club={club} element={element}/>
            </Center>
        </>;
    };
    return (
        <Tabs tabs={tabs}/>
    );
};

StatsTracker.title = "Stats Tracker";

export default StatsTracker;