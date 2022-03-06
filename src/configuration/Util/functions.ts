import ms from "ms";
import prettyMS from "pretty-ms";
import humanizer from "humanize-duration";

export function convertNumber(number: number) {
    if (number < 1000) return number.toString();
    else if (number < 1000000) return `${(number / 1000).toString()}k`;
    else if (number < 1000000000) return `${(number / 1000000).toString()}M`;
    else if (number < 1000000000000) return `${(number / 1000000000).toString()}B`;
    else return `${(number / 1000000000000).toString()}T`;
};

export function convertTime(time: string) {
    const arrayOfTime: Array<string> = time.split(" ");
    const newArray: Array<number> = [];
    for (const timeS of arrayOfTime) newArray.push(ms(timeS));
    return newArray.reduce((a, b) => a + b, 0) / 1000;
};

export function convertMilliseconds(timeInMilliseconds: number, short?: boolean, language?: string) {
    const value = short ? prettyMS(timeInMilliseconds) : humanizer(timeInMilliseconds, {
        units: ["mo", "d", "h", "m", "s"],
        language: language ? `${language[0]}${language[1]}` : undefined,
        delimiter: " ",
        fallbacks: ["en"]
    });
    if (value == "0ms") return "None";
    return value;
};

export function toCamelCase(name: string) {
    return `${name[0].toLowerCase()}${name.slice(1).replace(/ /g, "").replace(/-/g, "_").replace(/\./g, "").replace(/'/g, "")}`;
};