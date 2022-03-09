import { APIPlayerAchievement } from "clashofclans.js";
import { FC } from "react";
import Grid from "@components/Grid";
import Progress from "@components/Progress";
import Center from "@components/Center";
import styles from "@modules/ClashOfClansAchievement.module.scss";

const ClashOfClansAchievement: FC<{
    achievement: APIPlayerAchievement
}> = ({ achievement }) => {
    return (
        <div className={styles.achievement}>
            <Grid className="lg:grid-cols-12 grid-cols-3">
                <Center>
                    <img className="w-24" src={`/Images/Clash of Clans/Achievement-${achievement.stars}.png`}/>
                </Center>
                <div className="lg:col-span-7 col-span-2 font-bold [-webkit-box-flex:_1;] shrink grow basis-[0%] w-full">
                    <h5 className="mb-[5px] text-xs sm:text-base [line-height:_15px;] font-bold whitespace-nowrap">{achievement.name}</h5>
                    <div className="coc-description text-black font-normal">{achievement.info}</div>
                </div>
                <Center className="lg:col-span-4 col-span-3 w-auto [line-height:_40px;] lg:justify-end">
                    <Center>
                        {achievement.stars == 3 ? 
                        <Center className="coc-description text-[#5E6671] lg:justify-end">{achievement.completionInfo}<img className="w-7" src="/Images/Clash of Clans/check.png"/></Center> : 
                        <Progress percentage={Math.floor(achievement.value / achievement.target * 100)}>{achievement.value}/{achievement.target}</Progress>}
                    </Center>
                </Center>
            </Grid>
        </div>
    );
};
export default ClashOfClansAchievement;