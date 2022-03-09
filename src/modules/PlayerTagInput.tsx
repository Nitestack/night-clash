import { FC, DetailedHTMLProps, InputHTMLAttributes } from "react";
import Input from "@components/Input";
import Util from "@util/index";
import Button from "@components/Button";
import { HTMLMotionProps } from "framer-motion";
import { HashtagIcon, SearchIcon } from "@heroicons/react/outline";

const PlayerTagInput: FC<{
    element: string;
    club?: boolean;
    inputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    searchButtonProps?: HTMLMotionProps<"button">;
}> = ({ inputProps, element, club, searchButtonProps }) => {
    return (
        <div className="relative flex flex-wrap [align-items:_stretch;] w-full">
            <div className="flex -mr-[0.063rem]">
                <Button>
                    <HashtagIcon className="w-6"/>
                </Button>
            </div>
            <Input placeholder={element == "clan" ? (club ? "Club" : Util.toCapitalize(element)) : Util.toCapitalize(element)} {...inputProps}/>
            <div className="-ml-[1px] flex">
                <Button {...searchButtonProps}>
                    <SearchIcon className="w-6"/>
                </Button>
            </div>
        </div>
    );
};
export default PlayerTagInput;