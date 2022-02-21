class ClashRoyaleElixir {
    /**
     * Gets the elixir costs of a card
     * @param {string} card The name of the card
     */
    public static getElixirCosts(card: string) {
        let elixirCosts = 0;
        for (let i = 1; i < 10; i++) {
            //@ts-ignore
            const cards: Array<string> = ClashRoyaleElixir[(ClashRoyaleElixir.numbers[i] + "ElixirCards")];
            if (cards.includes(card)) {
                elixirCosts = i;
                break;
            };
        };
        if (ClashRoyaleElixir.onePointFiveElixirCards.includes(card)) elixirCosts = 1.5;
        return elixirCosts;
    };
    private static numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    private static oneElixirCards = ["Skeletons", "Ice Spirit", "Fire Spirit", "Electro Spirit", "Heal Spirit"];
    private static onePointFiveElixirCards = ["Mirror"];
    private static twoElixirCards =  ["Goblins", "Bomber", "Spear Goblins", "Ice Golem", "Bats", "Wall Breakers", "Rage", "Zap", "The Log", "Barbarian Barrel", "Giant Snowball"];
    private static threeElixirCards = ["Knight", "Archers", "Minions", "Skeleton Army", "Ice Wizard", "Guards", "Princess", "Miner", "Mega Minion", "Dart Goblin", "Goblin Gang", "Bandit", "Royal Ghost", "Skeleton Barrel", "Fisherman", "Firecracker", "Elixir Golem", "Cannon", "Tombstone", "Arrows", "Goblin Barrel", "Tornado", "Clone", "Earthquake", "Royal Delivery"];
    private static fourElixirCards = ["Valkyrie", "Musketeer", "Baby Dragon", "Mini P.E.K.K.A", "Hog Rider", "Dark Prince", "Lumberjack", "Battle Ram", "Inferno Dragon", "Hunter", "Night Witch", "Mother Witch", "Zappies", "Flying Machine", "Magic Archer", "Battle Healer", "Skeleton Dragons", "Mortar", "Bomb Tower", "Tesla", "Furnace", "Goblin Cage", "Goblin Drill", "Fireball", "Freeze", "Poison", "Skeleton King", "Golden Knight"];
    private static fiveElixirCards = ["Giant", "Balloon", "Witch", "Barbarians", "Prince", "Wizard", "Minion Horde", "Bowler", "Executioner", "Ram Rider", "Rascals", "Cannon Cart", "Royal Hogs", "Electro Dragon", "Goblin Hut", "Inferno Tower", "Graveyard", "Giant Skeleton", "Royal Giant", "Archer Queen"];
    private static sixElixirCards = ["Sparky", "Elite Barbarians", "Goblin Giant", "Elixir Collector", "X-Bow", "Rocket", "Lightning"];
    private static sevenElixirCards = ["P.E.K.K.A", "Lava Hound", "Royal Recruits", "Mega Knight", "Barbarian Hut"];
    private static eightElixirCards = ["Golem", "Electro Giant"];
    private static nineElixirCards = ["Three Musketeers"];
};

export default class CrConstants {
    public static maxLevel = 14;
    public static cardAmount = 106;
    public static localName = "ClashRoyale";
    public static Elixir = ClashRoyaleElixir;

    public static createDeckLink(cardIDs: Array<number>, isMobile?: boolean, war?: boolean) {
        let link = isMobile ? "clashroyale://copyDeck?deck=" : "https://link.clashroyale.com/deck/en?deck=";
        for (const cardID of cardIDs) link += `${cardID};`;
        link = link.slice(0, -1);
        if (war) link += "&war=1";
        return link;
    };
    
    public static openProfile(tag: string, isMobile?: boolean) {
        return (isMobile ? "clashroyale://playerInfo?id=" : "https://link.clashroyale.com/en?playerInfo?id=") + tag.toUpperCase().replace(/#/g, "");
    };
    
    public static openClan(tag: string, isMobile?: boolean) {
        return (isMobile ? "clashroyale://clanInfo?id=" : "https://link.clashroyale.com/en?clanInfo?id=") + tag.toUpperCase().replace(/#/g, "");
    };
};