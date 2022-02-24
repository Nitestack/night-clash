import Base from "@database/Boom Beach/Base";
import Defense from "@database/Boom Beach/Defense";
import Economy from "@database/Boom Beach/Economy";
import GunboatAbility from "@database/Boom Beach/GunboatAbility";
import Hero from "@database/Boom Beach/Hero";
import HeroAbility from "@database/Boom Beach/HeroAbility";
import Mine from "@database/Boom Beach/Mine";
import Support from "@database/Boom Beach/Support";
import Troop from "@database/Boom Beach/Troop";

//---------DEFENSE-----------\\
export const island: Array<Base> = [new Defense({
    name: "Sniper Tower",
    levels: [{
        costs: [100],
        upgradeDuration: "3s"
    }, {
        costs: [200],
        upgradeDuration: "5m"
    }, {
        costs: [760],
        upgradeDuration: "20m"
    }, {
        costs: [2070],
        upgradeDuration: "1h"
    }, {
        costs: [4700],
        upgradeDuration: "1h 15m"
    }, {
        costs: [9300],
        upgradeDuration: "1h 45m"
    }, {
        costs: [12500, 2200],
        upgradeDuration: "2h 15m"
    }, {
        costs: [19100, 3800],
        upgradeDuration: "2h 30m"
    }, {
        costs: [32000, 7100],
        upgradeDuration: "3h 30m"
    }, {
        costs: [52000, 12300, 3300],
        upgradeDuration: "4h"
    }, {
        costs: [83000, 20800, 6700],
        upgradeDuration: "5h"
    }, {
        costs: [115000, 42000, 12000],
        upgradeDuration: "6h"
    }, {
        costs: [177000, 83000, 21800],
        upgradeDuration: "7h"
    }, {
        costs: [255000, 153000, 44000],
        upgradeDuration: "8h"
    }, {
        costs: [360000, 315000, 87000],
        upgradeDuration: "10h"
    }, {
        costs: [630000, 480000, 175000],
        upgradeDuration: "12h"
    }, {
        costs: [910000, 810000, 360000],
        upgradeDuration: "14h"
    }, {
        costs: [1320000, 1090000, 690000],
        upgradeDuration: "16h"
    }, {
        costs: [1650000, 1500000, 990000],
        upgradeDuration: "20h"
    }, {
        costs: [2100000, 2100000, 2090000],
        upgradeDuration: "1d"
    }, {
        costs: [2760000, 2530000, 2300000],
        upgradeDuration: "1d 2h"
    }, {
        costs: [3380000, 3100000, 2820000],
        upgradeDuration: "1d 4h"
    }, {
        costs: [4060000, 3720000, 3380000],
        upgradeDuration: "1d 6h"
    }, {
        costs: [4870000, 4460000, 4060000],
        upgradeDuration: "1d 8h"
    }, {
        costs: [5840000, 5360000, 4870000],
        upgradeDuration: "1d 10h"
    }]
}), new Defense({
    name: "Mortar",
    levels: [{
        costs: [1180],
        upgradeDuration: "30m"
    }, {
        costs: [2360],
        upgradeDuration: "1h"
    }, {
        costs: [5900],
        upgradeDuration: "1h 45m"
    }, {
        costs: [11500],
        upgradeDuration: "2h 15m"
    }, {
        costs: [15000, 2730],
        upgradeDuration: "2h 45m"
    }, {
        costs: [23500, 4700],
        upgradeDuration: "3h 15m"
    }, {
        costs: [40000, 8700],
        upgradeDuration: "4h"
    }, {
        costs: [63000, 15000, 4000],
        upgradeDuration: "5h"
    }, {
        costs: [101000, 25200, 8200],
        upgradeDuration: "6h"
    }, {
        costs: [140000, 50000, 14600],
        upgradeDuration: "7h"
    }, {
        costs: [217000, 102000, 26700],
        upgradeDuration: "8h"
    }, {
        costs: [320000, 191000, 54000],
        upgradeDuration: "10h"
    }, {
        costs: [460000, 400000, 110000],
        upgradeDuration: "12h"
    }, {
        costs: [810000, 610000, 224000],
        upgradeDuration: "14h"
    }, {
        costs: [1180000, 1050000, 460000],
        upgradeDuration: "16h"
    }, {
        costs: [1720000, 1420000, 900000],
        upgradeDuration: "18h"
    }, {
        costs: [2170000, 1980000, 1300000],
        upgradeDuration: "20h"
    }, {
        costs: [2520000, 2450000, 1920000],
        upgradeDuration: "1d"
    }, {
        costs: [2880000, 2880000, 2870000],
        upgradeDuration: "1d 4h"
    }, {
        costs: [2960000, 2970000, 2950000],
        upgradeDuration: "1d 8h"
    }, {
        costs: [3420000, 3100000, 3070000],
        upgradeDuration: "1d 10h"
    }, {
        costs: [3750000, 3400000, 3360000],
        upgradeDuration: "1d 12h"
    }, {
        costs: [4130000, 3740000, 3700000],
        upgradeDuration: "1d 14h"
    }, {
        costs: [4330000, 3930000, 3890000],
        upgradeDuration: "1d 16h"
    }, {
        costs: [4760000, 4320000, 4270000],
        upgradeDuration: "1d 18h"
    }, {
        costs: [5000000, 4530000, 4480000],
        upgradeDuration: "1d 20h"
    }, {
        costs: [5500000, 4990000, 4930000],
        upgradeDuration: "1d 22h"
    }]
}), new Defense({
    name: "Machine Gun",
    levels: [{
        costs: [3300],
        upgradeDuration: "1h"
    }, {
        costs: [4600],
        upgradeDuration: "1h 15m"
    }, {
        costs: [8800],
        upgradeDuration: "1h 45m"
    }, {
        costs: [10000],
        upgradeDuration: "2h"
    }, {
        costs: [13200, 2320],
        upgradeDuration: "2h 15m"
    }, {
        costs: [14900, 2610],
        upgradeDuration: "2h 30m"
    }, {
        costs: [22500, 4500],
        upgradeDuration: "3h"
    }, {
        costs: [38000, 8400],
        upgradeDuration: "4h"
    }, {
        costs: [60000, 14400, 3800],
        upgradeDuration: "5h"
    }, {
        costs: [97000, 24300, 7800],
        upgradeDuration: "6h"
    }, {
        costs: [134000, 49000, 14000],
        upgradeDuration: "7h"
    }, {
        costs: [205000, 96000, 25200],
        upgradeDuration: "8h"
    }, {
        costs: [295000, 177000, 50000],
        upgradeDuration: "10h"
    }, {
        costs: [420000, 360000, 100000],
        upgradeDuration: "12h"
    }, {
        costs: [730000, 550000, 201000],
        upgradeDuration: "14h"
    }, {
        costs: [1040000, 930000, 410000],
        upgradeDuration: "16h"
    }, {
        costs: [1510000, 1240000, 790000],
        upgradeDuration: "18h"
    }, {
        costs: [1880000, 1710000, 1120000],
        upgradeDuration: "20h"
    }, {
        costs: [2150000, 2090000, 1640000],
        upgradeDuration: "22h"
    }, {
        costs: [2430000, 2430000, 2420000],
        upgradeDuration: "1d"
    }, {
        costs: [2760000, 2540000, 2980000],
        upgradeDuration: "1d 2h"
    }, {
        costs: [3150000, 2900000, 3400000],
        upgradeDuration: "1d 4h"
    }, {
        costs: [3590000, 3310000, 3880000],
        upgradeDuration: "1d 6h"
    }, {
        costs: [4090000, 3770000, 4420000],
        upgradeDuration: "1d 8h"
    }, {
        costs: [4670000, 4300000, 5040000],
        upgradeDuration: "1d 10h"
    }]
}), new Defense({
    name: "Cannon",
    levels: [{
        costs: [11600, 2030],
        upgradeDuration: "2h"
    }, {
        costs: [13200, 2320],
        upgradeDuration: "2h 15m"
    }, {
        costs: [19600, 3900],
        upgradeDuration: "2h 45m"
    }, {
        costs: [32000, 7100],
        upgradeDuration: "3h 30m"
    }, {
        costs: [50000, 12000, 3200],
        upgradeDuration: "4h"
    }, {
        costs: [79000, 19800, 6400],
        upgradeDuration: "5h"
    }, {
        costs: [107000, 39000, 11200],
        upgradeDuration: "6h"
    }, {
        costs: [161000, 76000, 19800],
        upgradeDuration: "7h"
    }, {
        costs: [227000, 136000, 39000],
        upgradeDuration: "8h"
    }, {
        costs: [314000, 274000, 76000],
        upgradeDuration: "9h"
    }, {
        costs: [540000, 410000, 149000],
        upgradeDuration: "10h"
    }, {
        costs: [610000, 460000, 168000],
        upgradeDuration: "12h"
    }, {
        costs: [850000, 760000, 330000],
        upgradeDuration: "14h"
    }, {
        costs: [950000, 850000, 370000],
        upgradeDuration: "16h"
    }, {
        costs: [1350000, 1110000, 700000],
        upgradeDuration: "18h"
    }, {
        costs: [1480000, 1220000, 770000],
        upgradeDuration: "20h"
    }, {
        costs: [1810000, 1650000, 1080000],
        upgradeDuration: "22h"
    }, {
        costs: [1970000, 1800000, 1180000],
        upgradeDuration: "1d"
    }, {
        costs: [2220000, 2160000, 1700000],
        upgradeDuration: "1d 4h"
    }, {
        costs: [2470000, 2470000, 2460000],
        upgradeDuration: "1d 8h"
    }, {
        costs: [2750000, 2990000, 3230000],
        upgradeDuration: "1d 10h"
    }, {
        costs: [3130000, 3400000, 3670000],
        upgradeDuration: "1d 12h"
    }, {
        costs: [3500000, 3800000, 4110000],
        upgradeDuration: "1d 14h"
    }, {
        costs: [3930000, 4260000, 4600000],
        upgradeDuration: "1d 16h"
    }, {
        costs: [4400000, 4780000, 5160000],
        upgradeDuration: "1d 18h"
    }]
}), new Defense({
    name: "Flamethrower",
    levels: [{
        costs: [31500, 7500, 2000],
        upgradeDuration: "2h 45m"
    }, {
        costs: [44000, 10500, 2800],
        upgradeDuration: "3h 45m"
    }, {
        costs: [69000, 17300, 5600],
        upgradeDuration: "4h"
    }, {
        costs: [94000, 34000, 9800],
        upgradeDuration: "5h"
    }, {
        costs: [107000, 39000, 11200],
        upgradeDuration: "6h"
    }, {
        costs: [161000, 76000, 19800],
        upgradeDuration: "7h"
    }, {
        costs: [244000, 147000, 42000],
        upgradeDuration: "8h"
    }, {
        costs: [340000, 295000, 81000],
        upgradeDuration: "9h"
    }, {
        costs: [360000, 315000, 87000],
        upgradeDuration: "10h"
    }, {
        costs: [620000, 470000, 172000],
        upgradeDuration: "12h"
    }, {
        costs: [870000, 780000, 340000],
        upgradeDuration: "14h"
    }, {
        costs: [1320000, 1090000, 690000],
        upgradeDuration: "16h"
    }, {
        costs: [1400000, 1150000, 730000],
        upgradeDuration: "18h"
    }, {
        costs: [1710000, 1560000, 1020000],
        upgradeDuration: "20h"
    }, {
        costs: [1920000, 1870000, 1470000],
        upgradeDuration: "22h"
    }, {
        costs: [2140000, 2140000, 2130000],
        upgradeDuration: "1d"
    }, {
        costs: [2260000, 2270000, 2260000],
        upgradeDuration: "1d 4h"
    }, {
        costs: [2370000, 2790000, 2580000],
        upgradeDuration: "1d 6h"
    }, {
        costs: [2710000, 3190000, 2950000],
        upgradeDuration: "1d 8h"
    }, {
        costs: [3040000, 3570000, 3300000],
        upgradeDuration: "1d 10h"
    }, {
        costs: [3220000, 3790000, 3500000],
        upgradeDuration: "1d 12h"
    }, {
        costs: [3600000, 4240000, 3920000],
        upgradeDuration: "1d 14h"
    }, {
        costs: [4040000, 4750000, 4390000],
        upgradeDuration: "1d 16h"
    }]
}), new Defense({
    name: "Boom Cannon",
    levels: [{
        costs: [121000, 57000, 14900],
        upgradeDuration: "5h"
    }, {
        costs: [141000, 66000, 17300],
        upgradeDuration: "6h"
    }, {
        costs: [198000, 119000, 34000],
        upgradeDuration: "7h"
    }, {
        costs: [255000, 153000, 44000],
        upgradeDuration: "8h"
    }, {
        costs: [350000, 308000, 85000],
        upgradeDuration: "10h"
    }, {
        costs: [610000, 460000, 168000],
        upgradeDuration: "12h"
    }, {
        costs: [850000, 760000, 330000],
        upgradeDuration: "14h"
    }, {
        costs: [950000, 850000, 370000],
        upgradeDuration: "16h"
    }, {
        costs: [1350000, 1110000, 700000],
        upgradeDuration: "18h"
    }, {
        costs: [1650000, 1500000, 990000],
        upgradeDuration: "20h"
    }, {
        costs: [1810000, 1650000, 1080000],
        upgradeDuration: "22h"
    }, {
        costs: [2040000, 1980000, 1560000],
        upgradeDuration: "1d"
    }, {
        costs: [2260000, 2270000, 2260000],
        upgradeDuration: "1d 6h"
    }, {
        costs: [2470000, 2470000, 2460000],
        upgradeDuration: "1d 12h"
    }, {
        costs: [3200000, 3460000, 2940000],
        upgradeDuration: "1d 14h"
    }, {
        costs: [3900000, 4210000, 3590000],
        upgradeDuration: "1d 16h"
    }, {
        costs: [4680000, 5050000, 4310000],
        upgradeDuration: "1d 18h"
    }, {
        costs: [5620000, 6060000, 5170000],
        upgradeDuration: "1d 20h"
    }, {
        costs: [6740000, 7270000, 6200000],
        upgradeDuration: "1d 22h"
    }]
}), new Defense({
    name: "Rocket Launcher",
    levels: [{
        costs: [142000, 85000, 24300],
        upgradeDuration: "5h"
    }, {
        costs: [198000, 119000, 34000],
        upgradeDuration: "6h"
    }, {
        costs: [275000, 240000, 66000],
        upgradeDuration: "7h"
    }, {
        costs: [314000, 274000, 76000],
        upgradeDuration: "8h"
    }, {
        costs: [540000, 410000, 149000],
        upgradeDuration: "10h"
    }, {
        costs: [760000, 680000, 298000],
        upgradeDuration: "12h"
    }, {
        costs: [850000, 760000, 330000],
        upgradeDuration: "14h"
    }, {
        costs: [1210000, 1000000, 630000],
        upgradeDuration: "16h"
    }, {
        costs: [1480000, 1350000, 890000],
        upgradeDuration: "18h"
    }, {
        costs: [1850000, 1800000, 1420000],
        upgradeDuration: "20h"
    }, {
        costs: [1920000, 1870000, 1470000],
        upgradeDuration: "1d"
    }, {
        costs: [2060000, 2060000, 2050000],
        upgradeDuration: "1d 4h"
    }, {
        costs: [2470000, 2470000, 2460000],
        upgradeDuration: "1d 8h"
    }, {
        costs: [4210000, 3590000, 3900000],
        upgradeDuration: "1d 10h"
    }, {
        costs: [5050000, 4310000, 4680000],
        upgradeDuration: "1d 12h"
    }, {
        costs: [6060000, 5170000, 5620000],
        upgradeDuration: "1d 14h"
    }, {
        costs: [7270000, 6200000, 6000000],
        upgradeDuration: "1d 16h"
    }]
}), new Defense({
    name: "Shock Launcher",
    levels: [{
        costs: [810000, 670000, 420000],
        upgradeDuration: "8h",
        expPoints: 18
    }, {
        costs: [940000, 780000, 490000],
        upgradeDuration: "10h",
        expPoints: 20
    }, {
        costs: [1150000, 1050000, 690000],
        upgradeDuration: "12h",
        expPoints: 22
    }, {
        costs: [1480000, 1350000, 890000],
        upgradeDuration: "14h",
        expPoints: 24
    }, {
        costs: [1670000, 1620000, 1270000],
        upgradeDuration: "18h",
        expPoints: 25
    }, {
        costs: [2040000, 1980000, 1560000],
        upgradeDuration: "20h",
        expPoints: 28
    }, {
        costs: [2470000, 2470000, 2460000],
        upgradeDuration: "1d",
        expPoints: 32
    }, {
        costs: [2880000, 2880000, 2870000],
        upgradeDuration: "1d 6h",
        expPoints: 36
    }, {
        costs: [3300000, 3300000, 3300000],
        upgradeDuration: "1d 12h",
        expPoints: 37
    }, {
        costs: [4320000, 4700000, 5080000],
        upgradeDuration: "1d 14h",
        expPoints: 39
    }, {
        costs: [5400000, 5870000, 6000000],
        upgradeDuration: "1d 16h",
        expPoints: 41
    }]
})];