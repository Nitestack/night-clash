import { townHall } from "@database/Clash of Clans/Home/townHall";
import { builderHall } from "@database/Clash of Clans/Builder/builderHall";
import { CRCard } from "@interfaces/clashRoyale";
import ClashRoyaleConstants from "@constants/clashRoyale";
import getDatabaseConnection from "@util/databaseConnection";
import getAPI from "@util/api";
import { Client } from "clashofclans.js";
import ApiHandler from "@util/apiHandler";
import Constants from "@util/constants";
import { convertMilliseconds, convertNumber, convertTime, toCamelCase } from "@util/functions";
import { Dispatch, SetStateAction } from "react";
import getAxiosInstance from "@util/axios";
import ClashOfClansUpgradeTracker from "@util/cocUpgradeTracker";
import { twMerge } from "tailwind-merge";

export default class Util {
    /*Classes*/
    public static ApiHandler = ApiHandler;
    public static Constants = Constants;
    public static Axios = getAxiosInstance();
    public static CocUpgradeTracker = ClashOfClansUpgradeTracker;
    /*Methods*/
    /**
     * Perform an asynchronous HTTP (Ajax) request.
     * @param {string} url A string containing the URL to which the request is sent.
     * @param {JQuery.AjaxSettings} settings A set of key/value pairs that configure the Ajax request. All settings are optional. A default can
     *                 be set for any option with $.ajaxSetup(). See jQuery.ajax( settings ) below for a complete list of all settings.
     * @param {Dispatch<SetStateAction<string>>} setErrorDescription The setter of the error description state
     * @param {Dispatch<SetStateAction<boolean>>} setShowErrorModal The setter of the show error modal state
     * @see \`{@link https://api.jquery.com/jQuery.ajax/ }\`
     * @since 1.5
     */
    public static jqueryAjax(url: string, settings?: JQuery.AjaxSettings, setErrorDescription?: Dispatch<SetStateAction<string>>, setShowErrorModal?: Dispatch<SetStateAction<boolean>>): JQuery.jqXHR {
        return $.ajax(url, {
            error: (error) => {
                if (setErrorDescription && setShowErrorModal) {
                    setErrorDescription(error.statusText);
                    setShowErrorModal(true);
                };
            },
            method: "POST",
            ...settings
        });
    };
    /**
     * Validates a tag and returns an resolved tag
     * @param {string} tag The tag 
     */
    public static validateTag(tag: string) {
        let resolvedTag = tag;
        if (!tag.includes("#")) resolvedTag = `#${tag}`;
        return resolvedTag;
    };
    /**
     * Converts all class names into one class string
     * @param {Argument[]} args The class(es)
     */
    public static classNames(...classLists: (string | false | null | undefined)[]) {
        return twMerge(...classLists);
    };
    /**
     * Whether the device is mobile or table or neither
     */
    public static isMobileOrTablet() {
        let check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            //@ts-ignore
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };
    /**
     * Whether the device is mobile or not
     */
    public static isMobile() {
        let check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            //@ts-ignore
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };
    /**
     * Sets a cookie on the client side
     * @param {string} name The name of the cookie 
     * @param {string} value The value of the cookie 
     * @param {number} durationInDays The duration of expire date in days 
     * @param {string?} path The path where the cookie is accessable
     */
    public static setCookie(name: string, value: any, durationInDays: number, path?: string) {
        const date = new Date();
        date.setTime(date.getTime() + (durationInDays * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${date.toUTCString()};${path ? ` path=${path}` : ""}`;
    };
    /**
     * Gets a cookie on the client side
     * @param {string} name The name of the cookie
     */
    public static getCookie(name: string) {
        name += "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            let content = cookieArray[i];
            while (content.charAt(0) == " ") content = content.substring(1);
            if (content.indexOf(name) == 0) return content.substring(name.length, content.length);
        };
        return "";
    };
    /**
     * Deletes a cookie on the client side
     * @param {string} name The name of the cookie 
     * @param {string?} path The path where the cookie is accessable
     */
    public static deleteCookie(name: string, path?: string) {
        if (Util.getCookie(name)) {
            document.cookie = `${name}=${(path) ? ";path=" + path : ""};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        };
    };
    /**
     * Whether the string is an email
     * @param {string} string The string to test
     */
    public static isEmail(string: string) {
        const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return emailRegex.test(string);
    };
    /**
     * Connects to the MongoDB database or if there is an active connection it returns the cached connection
     */
    public static async getConnection() {
        return await getDatabaseConnection();
    };
    /**
     * Get's the Clash of Clans API Client
     */
    public static async getCoCAPI(): Promise<Client> {
        return await getAPI("coc");
    };
    /**
     * Get's the Clash Royale API Client
     */
    public static async getCRAPI() {
        return await getAPI("cr");
    };
    /**
     * Get's the Brawl Stars API Client
     */
    public static async getBSAPI() {
        return await getAPI("bs");
    };
    /**
     * Gets the image of a Town Hall
     * @param {number} townHallLevel The Town Hall level 
     * @param {number?} townHallWeaponLevel The Town Hall Weapon level
     */
    public static getTownHallImage(townHallLevel: number, townHallWeaponLevel?: number) {
        return `/Images/Clash of Clans/Home/${townHallLevel >= 12 ? 
            `Defenses/${townHallLevel == 12 ? "Giga Tesla" : townHallLevel == 13 ? "Giga Inferno 1" : "Giga Inferno 2"}/${townHallWeaponLevel}` : 
            `Town Hall/${townHallLevel}`}.png`;
    };
    /**
     * Gets the image of a Builder Hall
     * @param {number} builderHallLevel The Builder Hall level
     */
    public static getBuilderHallImage(builderHallLevel: number) {
        return `/Images/Clash of Clans/Builder/Builder Hall/${builderHallLevel}.png`;
    };
    /**
     * Get's the rarity of a Clash Royale card
     * @param {CRCard} card The card
     */
    public static getRarityOfClashRoyaleCard(card: CRCard) {
        return card.maxLevel == ClashRoyaleConstants.maxLevel ? "common" : (card.maxLevel == ClashRoyaleConstants.maxLevel - 2 ? "rare" : (card.maxLevel == ClashRoyaleConstants.maxLevel - 5 ? "epic" : "legendary"));
    };
    /**
     * Get's the level of a Clash Royale card
     * @param card 
     * @returns 
     */
    public static getLevelOfClashRoyaleCard(card: CRCard) {
        return card.level + (ClashRoyaleConstants.maxLevel - card.maxLevel);
    };
    /**
     * Rounds a number
     * @param {number} number The number to round 
     * @param {number} decimalPlaces The amount of decimal places that will be returned 
     */
    public static round(number: number, decimalPlaces: number) {
        const factorOfTen = Math.pow(10, decimalPlaces);
        return Math.round(number * factorOfTen) / factorOfTen;
    };
    /**
     * Shorts the time
     * @param {string} text The text to short
     */
    public static shortener(text: string) {
        const textArray = text.split(" ");
        for (const textPiece of textArray) if (["0m", "0s", "0ms"].includes(textPiece)) textArray.splice(textArray.indexOf(textPiece), 1);
        if (!text.toLowerCase().includes("d") && !text.toLowerCase().includes("h") && !text.toLowerCase().includes("m")) return "1m";
        return textArray.slice(0, text.toLowerCase().includes("d") ? 3 : (!text.toLowerCase().includes("h") ? 1 : 2)).join(" ");
    };
    /**
     * Gets the percentage between two dates compared to today
     * @param {number} start The start date in milliseconds
     * @param {number} end The end date in milliseconds
     */
    public static getPercentage(start: number, end: number) {
        return `${Math.round(((Date.now() - start) / (end - start)) * 100)}%`;
    };
    /**
     * Resolves a database name
     * @param {string} name The name to resolve
     */
    public static resolveDatabaseName(name: string) {
        return name.includes("BuildersHut") ? "Builder's Hut" : (name.includes("XBow") ? "X-Bow" : (isNaN(name.charAt(name.length - 1) as unknown as number) ? name : name.slice(0, -1)).replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2'));
    };
    /**
     * Converts a resolved name into a database name
     * @param {string} name The resolved name
     */
    public static convertToDatabaseName(name: string) {
        return name.replace(/ /g, "").replace(/-/g, "").replace(/'/g, "");
    };
    /**
     * Converts a string into the camel case notation
     * @param {string} name The resolved name
     */
    public static toCamelCase(name: string) {
        return toCamelCase(name);
    };
    /**
     * Get item of hall
     * @param {string} name The resolved name of the element 
     * @param {number} hallLevel The level of the hall
     * @param {"home" | "builder"} village
     */
    public static getHallItem(name: string, hallLevel: number, village: "home" | "builder"): {
        maxLevel: number,
        amount: number
    } | number {
        //@ts-ignore
        return (village == "home" ? townHall : builderHall)[hallLevel - 1][this.toCamelCase(name)];
    };
    /**
     * Converts various time formats into seconds
     * @param {string} time The time format
     */
    public static convertTime(time: string) {
        return convertTime(time);
    };
    /**
     * Converts time in milliseconds into various time formats
     * @param {number} timeInMilliseconds The time in milliseconds
     * @param {boolean?} short whether the time format should be in short format
     * @param {string?} language The language of the user
     */
    public static convertMilliseconds(timeInMilliseconds: number, short?: boolean, language?: string) {
        return convertMilliseconds(timeInMilliseconds, short, language);
    };
    /**
     * Converts number into short style of it
     * @param {number} number The number to convert
     */
    public static convertNumber(number: number) {
        return convertNumber(number);
    };
    /**
     * Gets the the smallest value of 
     * @param {Array<number>} input The numbers to compare 
     */
    public static min(input: Array<number>) {
        return Math.min.apply(null, input);
    };
    /**
     * Removes duplicated values of an array
     * @param {Array<any>} values The array
     */
    public static removeDuplicates(values: Array<any>) {
        const newArray: Array<any> = [];
        for (const value of values) if (!newArray.includes(value)) newArray.push(value);
        return newArray;
    };
    /**
     * Capitalizes the first letter of the word
     * @param {string} text The text 
     */
    public static toCapitalize(text: string) {
        return `${text[0].toUpperCase()}${text.slice(1)}`;
    };
};