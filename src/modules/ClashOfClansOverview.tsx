import { FC } from "react";
import Grid from "@components/Grid";
import Util from "@util/index";
import UnitIcon from "@modules/ClashOfClansUnitIcon";
import { APIPlayer } from "clashofclans.js";
import Progress from "@components/Progress";
import Achievement from "@modules/ClashOfClansAchievement";
import Image from "next/image";
import Center from "@components/Center";

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
                <Center>
                    <h5 className="pt-[10px]">{item} {item.toLowerCase() == "home" ? "Village" : "Base"} Achievements</h5>    
                </Center>
                <Grid className="ml-3 mt-3 grid-cols-2 sm:grid-cols-3">
                    <Center className="col-span-2 sm:col-span-1">
                        <Progress percentage={overAllPercentage}>{overAllPercentage}%</Progress>
                    </Center>
                    <Center>
                        <p>{completedAchievements}/{achievements.length}</p>
                    </Center>
                    <p className="flex items-center justify-center">
                        {allStars}/{achievements.length * 3}
                        <Image className="ml-2" height="25px" width="25px" src="/Images/Clash of Clans/Achievement Star.png"/>
                    </p>
                </Grid>
                {achievements.map((achievementElement, index) => 
                <Achievement key={index} achievement={achievementElement}/>)}
            </>
        );
    };
    return (
        <>
            <Grid className={Util.classNames("grid-cols-3 bg-[linear-gradient(#8A94AD,_#6A7798)] p-3 rounded-lg border border-solid border-lightmodetext dark:border-darkmodetext", 
            village == "home" ? "grid-rows-3" : "grid-rows-2")}>
                <div className="col-span-3">
                    <h5>Troops</h5>
                    {(village == "home" ? [...homeTroopsArray, ...homeDarkTroopsArray] : builderTroopsArray).map((item, index) => 
                    <UnitIcon key={index} village={village} name={item} path="Troops" type="troop" player={player}/>)}    
                </div>
                <div className="col-span-1">
                    <h5>Heroes</h5>
                    {(village == "home" ? homeHeroesArray : ["Battle Machine"]).map((item, index) => 
                    <UnitIcon key={index} village={village} name={item} path="Heroes" type="hero" player={player}/>)}
                </div>
                {village == "home" ? 
                <div className="col-span-2">
                    <h5>Spells</h5>
                    {homeSpellsArray.map((item, index) => 
                    <UnitIcon key={index} village={village} name={item} path="Spells" type="spell" player={player}/>)}
                </div> : undefined}
                {village == "home" ? <>
                    <div className="col-span-1">
                        <h5>Pets</h5>
                        {homePetsArray.map((item, index) => 
                        <UnitIcon key={index} village={village} name={item} path="Pets" type="pet" player={player}/>)}
                    </div>
                    <div className="col-span-2">
                        <h5>Siege Machines</h5>
                        {homeSiegeMachinesArray.map((item, index) => 
                        <UnitIcon key={index} village={village} name={item} path="Siege Machines" type="siegeMachine" player={player}/>)}
                    </div>
                </> : undefined}
            </Grid>
            {displayAchievements("Home")}
            {displayAchievements("Builder")}
        </>
    );
};
export default ClashOfClansOverview;