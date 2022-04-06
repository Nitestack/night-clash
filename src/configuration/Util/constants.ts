import ClashOfClansConstants from "@constants/clashOfClans";
import ClashRoyaleConstants from "@constants/clashRoyale";
import { AdjustmentsIcon, ChartBarIcon, CogIcon } from "@heroicons/react/outline";


export default class Constants {
    public static APPLICATION_NAME = "NightClash";
    public static APPLICATION_DESCRIPTION = "is a community upgrade and stats tracker for a variety of Supercell Games!";
    public static CoC = ClashOfClansConstants;
    public static CR = ClashRoyaleConstants;
    public static ADMIN_ROLE_ID = "620932ba59e1667c0426444c";
    public static USER_ROLE_ID = "620932ba59e1667c0426444b";
    public static MAXED_TAG_LENGTH = 10;
    public static MIN_TAG_LENGTH = 7;

    public static features: Array<{
        name: string,
        description: string,
        icon: (props: JSX.IntrinsicElements["svg"]) => JSX.Element
    }> = 
    [
        {
            name: "Upgrade Tracker",
            description: "Track your upgrades and keep track of your progress!",
            icon: AdjustmentsIcon,
        },
        {
            name: "Stats Tracker",
            description: "Track stats of a player, a clan or other various stats!",
            icon: ChartBarIcon,
        },
        {
            name: "Tools",
            description: "Utility tools to help you in game!",
            icon: CogIcon,
        }
    ];
};