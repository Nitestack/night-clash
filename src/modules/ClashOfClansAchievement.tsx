import { APIPlayerAchievement } from "clashofclans.js";
import { FC } from "react";
import Grid from "@components/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Progress from "@components/Progress";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Center from "@components/Center";
import styles from "@modules/ClashOfClansAchievement.module.scss";

const ClashOfClansAchievement: FC<{
    achievement: APIPlayerAchievement
}> = ({ achievement }) => {
    return (
        <div className={styles.achievement}>
            <Grid>
                <Row>
                    <Column xs="2">
                        <img className="w-24" src={`/Images/Clash of Clans/Achievement-${achievement.stars}.png`}/>
                    </Column>
                    <div className="font-bold [-webkit-box-flex:_1;] shrink grow basis-[0%] w-full ">
                        <h5 className="mb-[5px] text-[16px] [line-height:_15px;] font-bold">{achievement.name}</h5>
                        <div className="coc-description text-black font-normal">{achievement.info}</div>
                    </div>
                    <div className="w-auto [line-height:_40px;] flex justify-center align-middle">
                        <Center>
                            {achievement.stars == 3 ? 
                            <div align="right" className="coc-description text-[#5E6671]">{achievement.completionInfo}<FontAwesomeIcon color="green" size="2x" icon={faCheck}/></div> : 
                            <Progress percentage={Math.floor(achievement.value / achievement.target * 100)}>{achievement.value}/{achievement.target}</Progress>}
                        </Center>
                    </div>
                </Row>
            </Grid>
        </div>
    );
};
export default ClashOfClansAchievement;