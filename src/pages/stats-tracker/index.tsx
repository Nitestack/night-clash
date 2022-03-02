import { NextPageWithConfiguration } from "@util/types";
import { FC } from "react";
import Accordion from "@components/Accordion";
import Center from "@components/Center";
import Tabs from "@components/Tabs";
import Input from "@components/Input";
import Util from "@util/index";

const StatsTracker: NextPageWithConfiguration = () => {
    return (
        <>
            <Tabs tabs={{
                "Clash of Clans" : <Tab backgroundImageName="Clash of Clans"/>,
                "Clash Royale": <Tab backgroundImageName="Clash Royale"/>,
                "Brawl Stars": <Tab backgroundImageName="Brawl Stars" club/>
            }}/>
        </>
    );
    
};

const Tab: FC<{
    club?: boolean,
    backgroundImageName: string
}> = ({ club, backgroundImageName }) => {
    const tabs: { [key: string]: JSX.Element } = {};
    for (const element of ["player", "clan"]) tabs[`Find a ${element == "clan" ? (club ? "club" : element) : element}`] = <>
        <Center>
            <img className="h-56" src={"/Images/" + backgroundImageName + ".png"}/>
        </Center>
        <Center>
            <Input name="tag" type="text" maxLength={10} minLength={8} placeholder={element == "clan" ? (club ? "Club" : Util.toCapitalize(element)) : Util.toCapitalize(element)}></Input>
        </Center>
    </>;
    console.log(tabs)
    return (
        <Tabs tabs={tabs}/>
    );
};

StatsTracker.title = "Stats Tracker";

export default StatsTracker;