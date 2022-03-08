import { FC } from "react";
import Container from "@components/Grid/Container";
import Row from "@components/Grid/Row";
import Column from "@components/Grid/Column";
import Util from "@util/index";
import UnitIcon from "@modules/Upgrade Tracker/cocUnitIcon";
import { APIPlayer } from "clashofclans.js";
import Progress from "@components/Progress";
import Achievement from "@modules/ClashOfClansAchievement";
import Image from "next/image";

const ClashOfClansOverview: FC<{ village: "home" | "builder", player: APIPlayer }> = ({ village, player }) => {
    const { homeTroopsArray, homeDarkTroopsArray, builderTroopsArray, homeSpellsArray, homeSiegeMachinesArray, homeHeroesArray, homePetsArray } = Util.Constants.CoC;
    function displayAchievements(item: "Home" | "Builder") {
        const achievements = player.achievements.filter(achievement => achievement.village.toLowerCase().includes(item.toLowerCase()));
        let allStars = 0;
        let completedAchievements = 0;
        for (const i of achievements) {
            allStars += i.stars;
            if (i.stars == 3) completedAchievements++;
        };
        const overAllPercentage = Math.floor(allStars / (achievements.length * 3) * 100);
        return(
            <>
                <h5 className="pt-[10px]">{item} {item.toLowerCase() == "home" ? "Village" : "Base"} Achievements</h5>
                <Container className="p-0 ml-3 mt-3">
                    <Row>
                        <Column className="p-0">
                            <Progress percentage={overAllPercentage}>{overAllPercentage}%</Progress>
                        </Column>
                        <Column>
                            <p className="p-0">{completedAchievements}/{achievements.length}</p>
                        </Column>
                        <Column>
                            <p className="pt-0 inline-flex">
                                {allStars}/{achievements.length * 3}
                                <Image className="ml-2" height="25px" width="25px" src="/Images/Clash of Clans/Achievement Star.png"/>
                            </p>
                        </Column>
                    </Row>
                </Container>
                {achievements.map((achievementElement, index) => 
                <Achievement key={index} achievement={achievementElement}/>)}
            </>
        );
    };
    return (
        <>
            <Container className="bg-[linear-gradient(#8A94AD,_#6A7798)] p-3 rounded-lg border border-solid border-lightmodetext dark:border-darkmodetext">
                <Row>
                    <Column>
                        <h5>Troops</h5>
                        {(village == "home" ? [...homeTroopsArray, ...homeDarkTroopsArray] : builderTroopsArray).map((item, index) => 
                        <UnitIcon key={index} village={village} name={item} path="Troops" type="troop" player={player}/>)}
                    </Column>
                </Row>
                <Row>
                    {village == "home" ? <>
                        <Column>
                            <h5>Spells</h5>
                            {homeSpellsArray.map((item, index) => 
                            <UnitIcon key={index} village={village} name={item} path="Spells" type="spell" player={player}/>)}
                        </Column>
                        <Column>
                            <h5>Siege Machines</h5>
                            {homeSiegeMachinesArray.map((item, index) => 
                            <UnitIcon key={index} village={village} name={item} path="Siege Machines" type="siegeMachine" player={player}/>)}
                        </Column>
                    </> : undefined}
                </Row>
                <Row>
                    <Column>
                        <h5>Heroes</h5>
                        {(village == "home" ? homeHeroesArray : ["Battle Machine"]).map((item, index) => 
                        <UnitIcon key={index} village={village} name={item} path="Heroes" type="hero" player={player}/>)}
                    </Column>
                    {village == "home" ? 
                    <Column>
                        <h5>Pets</h5>
                        {homePetsArray.map((item, index) => 
                        <UnitIcon key={index} village={village} name={item} path="Pets" type="pet" player={player}/>)}
                    </Column> : undefined}
                </Row>
            </Container>
            {displayAchievements("Home")}
            {displayAchievements("Builder")}
        </>
    );
};
export default ClashOfClansOverview;