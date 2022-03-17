import Grid from "@components/Utilities/Grid";
import type { NextPageWithConfiguration } from "@util/types";
import Util from "@util/index";
import styles from "@modules/ClashOfClansUnitIcon.module.scss";
import Input from "@components/Elements/Input";
import Center from "@components/Utilities/Center";
import { useState } from "react";

const { homeTroopsArray, homeDarkTroopsArray, homeSpellsArray, homeDarkSpellsArray, homeSuperTroopsArray, homeDarkSuperTroopsArray, homeSiegeMachinesArray } = Util.Constants.CoC;

const ClashOfClansArmyMaker: NextPageWithConfiguration = () => {
    const [troopHousingSpace, setTroopHousingSpace] = useState(0);
    const [spellHousingSpace, setSpellHousingSpace] = useState(0);
    const [siegeMachineHousingSpace, setSiegeMachineHousingSpace] = useState(0);
    
    function addTroopHousingSpace() {
        return () => {
            const troopInputs = $<HTMLInputElement>("[data-troop]");
            let newTroopHousingSpace = 0;
            troopInputs.each((i, element) => {
                newTroopHousingSpace =+ parseInt(element.value)
            });
            setTroopHousingSpace(newTroopHousingSpace);
        };
    };
    
    const troopIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 23, 24, 59, 53, 65];
    const darkTroopIDs = [10, 11, 12, 13, 15, 17, 22, 58, 82]
    const spellIDs = [0, 1, 2, 3, 5, 16, 35, 9, 10, 11, 17, 28];
    const siegeMachineIDs = [51, 52, 62, 75, 87, 91];
    const superTroopIDs = [26, 27, 29, 55, 28, 57, 83, 81, 63];
    const darkSuperTroopIDs = [84, 64, 66, 76, 80];

    const troopSpace = [1, 1, 5, 1, 2, 5, 4, 14, 20, 25, 10, 6, 30, 18, 25];
    const darkTroopSpace = [2, 5, 8, 30, 12, 30, 6, 15, 6];
    const spellSpace = [1, 2, 2, 2, 1, 3, 1, 1, 1, 1, 1, 1];
    const superTroopSpace = [5, 12, 10, 3, 8, 8, 10, 15, 40];
    const darkSuperTroopSpace = [12, 20, 40, 40, 30];
    return (
        <Grid className={Util.classNames("bg-[linear-gradient(#8A94AD,_#6A7798)] p-3 rounded-lg border border-solid border-lightmodetext dark:border-darkmodetext")}>
            <div className="pb-4">
                <h5>Troops</h5>
                <Grid className="grid-cols-12 justify-items-center">
                    {homeTroopsArray.map((troop, i) => 
                    <div key={i}>
                        <div className={styles["unit-icon"]} style={{ 
                            backgroundImage: `url('/Images/Clash of Clans/Home/Troops/${troop}.png')`
                        }} title={troop}/>
                        <Input onChange={addTroopHousingSpace()} type="number" className="w-[65px]" data-troop defaultValue={0} maxLength={3} min={0} max={Math.floor(300 / troopSpace[i])}/>
                    </div>)}   
                </Grid> 
            </div>
            <div className="pb-4">
                <Grid className="grid-cols-12 justify-items-center">
                    {homeSuperTroopsArray.map((superTroop, i) => 
                    <div key={i}>
                        <div className={styles["unit-icon"]} style={{ 
                            backgroundImage: `url('/Images/Clash of Clans/Home/Troops/${superTroop}.png')`
                        }} title={superTroop}/>
                        <Input onChange={addTroopHousingSpace()} type="number" className="w-[65px]" data-troop defaultValue={0} maxLength={3} min={0} max={Math.floor(300 / superTroopSpace[i])}/>
                    </div>)}    
                </Grid>
            </div>
            <div className="pb-4">
                <Grid className="grid-cols-12 justify-items-center">
                    {homeDarkTroopsArray.map((darkTroop, i) => 
                    <div key={i}>
                        <div className={styles["unit-icon"]} style={{ 
                            backgroundImage: `url('/Images/Clash of Clans/Home/Troops/${darkTroop}.png')`
                        }} title={darkTroop}/>
                        <Input onChange={addTroopHousingSpace()} type="number" className="w-[65px]" data-troop defaultValue={0} maxLength={3} min={0} max={Math.floor(300 / darkTroopSpace[i])}/>
                    </div>)}    
                </Grid>
            </div>
            <div className="pb-4">
                <Grid className="grid-cols-12 justify-items-center">
                    {homeDarkSuperTroopsArray.map((superDarkTroop, i) => 
                    <div key={i}>
                        <div className={styles["unit-icon"]} style={{ 
                            backgroundImage: `url('/Images/Clash of Clans/Home/Troops/${superDarkTroop}.png')`
                        }} title={superDarkTroop}/>
                        <Input onChange={addTroopHousingSpace()} type="number" className="w-[65px]" data-troop defaultValue={0} maxLength={3} min={0} max={Math.floor(300 / darkSuperTroopSpace[i])}/>
                    </div>)}    
                </Grid>
            </div>
            <div className="pb-4">
                <h5>Spells</h5>
                <Grid className="grid-cols-12 justify-items-center">
                    {homeSpellsArray.map((spell, i) => 
                    <div key={i}>
                        <div className={styles["unit-icon"]} style={{ 
                            backgroundImage: `url('/Images/Clash of Clans/Home/Spells/${spell}.png')`
                        }} title={spell}/>
                        <Input type="number" className="w-[65px]" defaultValue={0} min={0} maxLength={2} max={Math.floor(11 / spellSpace[i])}/>
                    </div>)}   
                </Grid> 
            </div>
            <div className="pb-4">
                <h5>Siege Machines</h5>
                <Grid className="grid-cols-12 justify-items-center">
                    {homeSiegeMachinesArray.map((siegeMachine, i) => 
                    <div key={i}>
                        <div className={styles["unit-icon"]} style={{ 
                            backgroundImage: `url('/Images/Clash of Clans/Home/Siege Machines/${siegeMachine}.png')`
                        }} title={siegeMachine}/>
                        <Input type="number" className="w-[65px]" defaultValue={0} min={0} maxLength={1} max={1}/>
                    </div>)}   
                </Grid> 
            </div>
            <div>
                <Center>
                    <p className="font-coc-description">Troop Housing Space: {troopHousingSpace}</p>
                </Center>
                <Center>
                    <p className="font-coc-description">Spell Housing Space: {spellHousingSpace}</p>
                </Center>
            </div>
        </Grid>
    );
};
ClashOfClansArmyMaker.title = "Clash of Clans - Army Maker";
ClashOfClansArmyMaker.description = "Create an army and share it or use it by yourself!";

export default ClashOfClansArmyMaker;