import type { NextPageWithConfiguration } from "@util/types";
import type { FC, RefObject } from "react";
import { useEffect, useState, useRef } from "react";
import Center from "@components/Utilities/Center";
import Tabs from "@components/Tabs";
import Util from "@util/index";
import PlayerTagInput from "@modules/PlayerTagInput";

const StatsTracker: NextPageWithConfiguration = () => {
    const tracker = ["clashofclans", "clashroyale", "brawlstars"];
    const [defaultIndex, setDefaultIndex] = useState(0);
    useEffect(() => {
        if (!location.hash) location.hash = `#${tracker[0]}`;
        setDefaultIndex(tracker.includes(location.hash.replace(/#/g, "")) ? tracker.indexOf(location.hash.replace(/#/g, "")) : 0);
    }, []);
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
    function redirectToTracker(element: string, ref: RefObject<HTMLInputElement>) {
        return () => {
            if (ref.current) {
                const tag = ref.current.value;
                if (tag && tag.length < Util.Constants.MAXED_TAG_LENGTH && tag.length >= Util.Constants.MIN_TAG_LENGTH) {
                    window.open(`/stats-tracker/${tracker}/${(element == "clan" ? (club ? "club" : element) : element) + "s"}/${tag.replace(/#/g, "")}${hash ? `#${hash}` : ""}`, "_blank");
                };
            };
        };
    };
    for (const element of ["player", "clan"]) {
        const playerTagRef = useRef<HTMLInputElement>(null);
        tabs[`Find a ${element == "clan" ? (club ? "club" : element) : element}`] = 
        <>
            <Center>
                <img className="w-[60vw]" src={`/Images/${backgroundImageName}.png`}/>
            </Center>
            <Center>
                <PlayerTagInput ref={playerTagRef} searchButtonProps={{
                    onClick: redirectToTracker(element, playerTagRef)
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