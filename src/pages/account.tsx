import type { NextPageWithConfiguration } from "@util/types";
import { useSession } from "next-auth/react";
import Link from "@components/Elements/Link";
import Button from "@components/Elements/Button";
import Grid from "@components/Utilities/Grid";
import Center from "@components/Utilities/Center";
import Util from "@util/index";
import { ClashOfClansPlayerProfile, ClashOfClansClanProfile, ClashRoyaleClanProfile, ClashRoyalePlayerProfile, BrawlStarsClubProfile, BrawlStarsPlayerProfile } from "@models/user";
import XP from "@modules/XP";
import { PencilIcon, CheckIcon } from "@heroicons/react/outline";
import { ChangeEvent, useState } from "react";
import Input from "@components/Elements/Input";
import validator from "validator";

const AccountPage: NextPageWithConfiguration<{}, {}, {
    clashOfClansVillages: Array<ClashOfClansPlayerProfile>,
    clashOfClansStatsTrackerPlayers: Array<ClashOfClansPlayerProfile>,
    clashOfClansStatsTrackerClans: Array<ClashOfClansClanProfile>,
    clashRoyaleStatsTrackerPlayers: Array<ClashRoyalePlayerProfile>,
    clashRoyaleStatsTrackerClans: Array<ClashRoyaleClanProfile>,
    brawlStarsStatsTrackerPlayers: Array<BrawlStarsPlayerProfile>,
    brawlStarsStatsTrackerClans: Array<BrawlStarsClubProfile>
}> = ({ data }) => {
    const { data: session } = useSession();
    //@ts-ignore
    const [username, setUsername] = useState<string>(session?.user?.name);
    //@ts-ignore
    const [email, setEmail] = useState<string>(session?.user?.email);
    const [editUsernameMode, setEditUsernameMode] = useState(false);
    const [editEmailMode, setEditEmailMode] = useState(false);
    const { clashOfClansVillages, clashOfClansStatsTrackerClans, clashOfClansStatsTrackerPlayers, clashRoyaleStatsTrackerClans, clashRoyaleStatsTrackerPlayers, brawlStarsStatsTrackerClans, brawlStarsStatsTrackerPlayers } = data;
    
    //Clash of Clans
    for (const player of [...clashOfClansVillages, ...clashOfClansStatsTrackerPlayers]) {
        if (player.clan) clashOfClansStatsTrackerClans.push(player.clan);
    };
    const newClashOfClansStatsTrackerClans: Array<ClashOfClansClanProfile> = Util.removeDuplicates(clashOfClansStatsTrackerClans);
    const newClashOfClansStatsTrackerPlayers: Array<ClashOfClansPlayerProfile> = Util.removeDuplicates([...clashOfClansStatsTrackerPlayers, ...clashOfClansVillages]);
    
    //Clash Royale
    for (const player of clashRoyaleStatsTrackerPlayers) {
        if (player.clan) clashRoyaleStatsTrackerClans.push(player.clan);
    };
    const newClashRoyaleStatsTrackerClans: Array<ClashRoyaleClanProfile> = Util.removeDuplicates(clashRoyaleStatsTrackerClans);

    //Brawl Stars
    for (const player of brawlStarsStatsTrackerPlayers) {
        if (player.club) brawlStarsStatsTrackerClans.push(player.club);
    };
    const newBrawlStarsStatsTrackerClans: Array<BrawlStarsClubProfile> = Util.removeDuplicates(brawlStarsStatsTrackerClans);
    
    //Username
    function setUsernameEditMode() {
        return () => {
            setEditUsernameMode(!editUsernameMode);
        };
    };
    function saveUsername() {
        return async () => {
            const newUsername = $<HTMLInputElement>("#usernameEdit");
            if (!newUsername.val()) return Util.toast.error("Please enter a new username!");
            if (newUsername.val() == username) return setEditUsernameMode(false);
            await Util.ApiHandler.clientSideErrorHandler(async () => {
                const response = await Util.Axios.post("/api/user/editusername", {
                    username: newUsername.val(),
                    email: email
                });
                if (response.status == 200) {
                    Util.toast.success(`Successfully changed username to: ${newUsername.val()}!`);
                    setUsername(newUsername.val() as string);
                    setEditUsernameMode(false);
                };
            });
        };
    };
    //Email
    function setEmailEditMode() {
        return () => {
            setEditEmailMode(!editEmailMode);
        };
    };
    function saveEmail() {
        return () => {
            const newEmail = $<HTMLInputElement>("#emailEdit");
            if (!newEmail.val()) return Util.toast.error("Please enter a new email!");
            if (!validator.isEmail(newEmail.val() as string)) return Util.toast.error("Please enter a valid email!");
            setEmail(newEmail.val() as string);
            setEditEmailMode(false);
        };
    };
    return (
        <>
            <div className="bg-lightmodeprimary dark:bg-darkmodeprimary shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium"> Account Information </h3>
                    <p className="mt-1 max-w-2xl text-lg text-gray-500 font-coc-description"> Personal details and data </p>
                </div>
                <div className="border-t border-b border-gray-200">
                    <dl>
                        <div className="bg-lightmodeprimary dark:bg-darkmodeprimary px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <div className="flex items-center">
                                <dt className="text-sm font-medium text-gray-500 justify-self-start"> Username </dt>
                                <Button onClick={setUsernameEditMode()} className="p-2 w-7">
                                    <PencilIcon className="w-5"/>
                                </Button>
                            </div>
                            {editUsernameMode ? 
                            <Center className="justify-start sm:col-span-2">
                                <Input type="text" defaultValue={username} id="usernameEdit"/>
                                <Button className="bg-green-500 p-2 w-7" onClick={saveUsername()}>
                                    <CheckIcon className="w-5"/>
                                </Button>
                            </Center> : 
                            <dd className="mt-1 text-lg font-coc-description sm:mt-0 sm:col-span-2"> {username} </dd>}
                        </div>
                        <div className="bg-lightmodeprimary dark:bg-darkmodeprimary px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <div className="flex items-center">
                                <dt className="text-sm font-medium text-gray-500"> E-Mail Address </dt>
                                <Button onClick={setEmailEditMode()} className="p-2 w-7">
                                    <PencilIcon className="w-5"/>
                                </Button>
                            </div>
                            {editEmailMode ? 
                            <Center className="justify-start sm:col-span-2">
                                <Input type="text" defaultValue={email} id="emailEdit"/>
                                <Button className="bg-green-500 p-2 w-7" onClick={saveEmail()}>
                                    <CheckIcon className="w-5"/>
                                </Button>
                            </Center> : 
                            <dd className="mt-1 text-lg font-coc-description sm:mt-0 sm:col-span-2"> {email} </dd>}
                        </div>
                    </dl>
                </div>
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium"> Clash of Clans </h3>
                    <p className="mt-1 max-w-2xl text-lg text-gray-500 font-coc-description"> Manage saved villages and clans </p>
                </div>
                <div className="border-t border-b border-gray-200">
                    <dl>
                        {clashOfClansVillages.length >= 1 ? <div className="bg-lightmodeprimary dark:bg-darkmodeprimary px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500"> Upgrade Tracker </dt>
                            <Grid className="sm:justify-items-center grid-cols-1 sm:grid-cols-2">
                                {clashOfClansVillages.map((village) => 
                                <Link key={village.tag} target="_blank" href={`/upgrade-tracker/clashofclans/${village.tag.replace(/#/g, "")}`}>
                                    <Button className="bg-blue-500 w-full">
                                        <Center>
                                            <img className="w-12" src={Util.CocUpgradeTracker.getTownHallImage(village.townHallLevel, village.townHallWeaponLevel)}/>
                                            <div>
                                                <p>{village.name}</p>
                                                <span>{village.tag}</span>
                                            </div>
                                        </Center>
                                    </Button>
                                </Link>)}
                            </Grid>
                        </div> : undefined}
                        <div className="bg-lightmodeprimary dark:bg-darkmodeprimary px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500"> Saved Players </dt>
                            <Grid className="sm:justify-items-center grid-cols-1 sm:grid-cols-2">
                                {newClashOfClansStatsTrackerPlayers.map((village) => 
                                <Link key={village.tag} target="_blank" href={`/stats-tracker/clashofclans/players/${village.tag.replace(/#/g, "")}`}>
                                    <Button className="bg-blue-500 w-full">
                                        <Center>
                                            <img className="w-12" src={Util.CocUpgradeTracker.getTownHallImage(village.townHallLevel, village.townHallWeaponLevel)}/>
                                            <div>
                                                <p>{village.name}</p>
                                                <span>{village.tag}</span>
                                            </div>
                                        </Center>
                                    </Button>
                                </Link>)}
                            </Grid>
                        </div>
                        <div className="bg-lightmodeprimary dark:bg-darkmodeprimary px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500"> Saved Clans </dt>
                            <Grid className="sm:justify-items-center grid-cols-1 sm:grid-cols-2">
                                {newClashOfClansStatsTrackerClans.map((clan) => 
                                <Link key={clan.tag} target="_blank" href={`/stats-tracker/clashofclans/clans/${clan.tag.replace(/#/g, "")}`}>
                                    <Button className="bg-blue-500">
                                        <Center>
                                            <img className="w-12" src={clan.iconUrl}/>
                                            <div>
                                                <p>{clan.name}</p>
                                                <span>{clan.tag}</span>
                                            </div>
                                        </Center>
                                    </Button>
                                </Link>)}
                            </Grid>
                        </div>
                    </dl>
                </div>
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium"> Clash Royale </h3>
                    <p className="mt-1 max-w-2xl text-lg text-gray-500 font-coc-description"> Manage saved villages and clans </p>
                </div>
                <div className="border-t border-b border-gray-200">
                    <dl>
                        <div className="bg-lightmodeprimary dark:bg-darkmodeprimary px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500"> Saved Players </dt>
                            <Grid className="sm:justify-items-center grid-cols-1 sm:grid-cols-2">
                                {clashRoyaleStatsTrackerPlayers.map((player) => 
                                <Link key={player.tag} target="_blank" href={`/stats-tracker/clashroyale/players/${player.tag.replace(/#/g, "")}`}>
                                    <Button className="bg-blue-500 w-full">
                                        <Center>
                                            <XP cr expLevel={player.expLevel}/>
                                            <div>
                                                <p>{player.name}</p>
                                                <span>{player.tag}</span>
                                            </div>
                                        </Center>
                                    </Button>
                                </Link>)}
                            </Grid>
                        </div>
                        <div className="bg-lightmodeprimary dark:bg-darkmodeprimary px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500"> Saved Clans </dt>
                            <Grid className="sm:justify-items-center grid-cols-1 sm:grid-cols-2">
                                {newClashRoyaleStatsTrackerClans.map((clan) => 
                                <Link key={clan.tag} target="_blank" href={`/stats-tracker/clashroyale/clans/${clan.tag.replace(/#/g, "")}`}>
                                    <Button className="bg-blue-500">
                                        <Center>
                                            <img className="w-12" src={`https://cdn.statsroyale.com/images/badges/${clan.badgeId}.png`}/>
                                            <div>
                                                <p>{clan.name}</p>
                                                <span>{clan.tag}</span>
                                            </div>
                                        </Center>
                                    </Button>
                                </Link>)}
                            </Grid>
                        </div>
                    </dl>
                </div>
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="leading-6 font-medium font-bs text-2xl"> Brawl Stars </h3>
                    <p className="mt-1 max-w-2xl text-gray-500 font-bs text-xl"> Manage saved villages and clans </p>
                </div>
                <div className="border-t border-gray-200 font-bs">
                    <dl>
                        <div className="bg-lightmodeprimary dark:bg-darkmodeprimary px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-xl font-medium text-gray-500"> Saved Players </dt>
                            <Grid className="sm:justify-items-center grid-cols-1 sm:grid-cols-2">
                                {brawlStarsStatsTrackerPlayers.map((player) => 
                                <Link key={player.tag} target="_blank" href={`/stats-tracker/brawlstars/players/${player.tag.replace(/#/g, "")}`}>
                                    <Button className="bg-blue-500 w-full">
                                        <Center>
                                            <img className="w-12" src={`https://cdn.brawlstats.com/player-thumbnails/${player.iconId}.png`}/>
                                            <div>
                                                <p className="text-xl">{player.name}</p>
                                                <span className="text-xl">{player.tag}</span>
                                            </div>
                                        </Center>
                                    </Button>
                                </Link>)}
                            </Grid>
                        </div>
                        <div className="bg-lightmodeprimary dark:bg-darkmodeprimary px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-xl font-medium text-gray-500"> Saved Clans </dt>
                            <Grid className="sm:justify-items-center grid-cols-1 sm:grid-cols-2">
                                {newBrawlStarsStatsTrackerClans.map((clan) => 
                                <Link key={clan.tag} target="_blank" href={`/stats-tracker/brawlstars/clubs/${clan.tag.replace(/#/g, "")}`}>
                                    <Button className="bg-blue-500">
                                        <Center>
                                            <div>
                                                <p className="text-xl">{clan.name}</p>
                                                <span className="text-xl">{clan.tag}</span>
                                            </div>
                                        </Center>
                                    </Button>
                                </Link>)}
                            </Grid>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    );
};

AccountPage.title = "Account";
AccountPage.header = "My Account";
AccountPage.description = "Access your saved data or edit your credentials!";
AccountPage.authenticationRequired = true;
AccountPage.fetchData = {
    method: "post",
    url: "/api/user/profile",
    data: (router, user) => {
        return {
            email: user.email
        }
    }
};

export default AccountPage;