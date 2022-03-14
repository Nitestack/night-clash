import type { FC } from "react";
import Util from "@util/index";
import Center from "@components/Utilities/Center";

/**
 * [Documentation](https://codepen.io/aaroniker/pen/MWgRBdV)
 */
const LoadingScreen: FC = () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7];
    return (
        <>
            <Center className="bg-lightmodebackground dark:bg-darkmodebackground min-h-[100vh]">
                <div className="loader">
                    {numbers.map((number) => (
                        <div key={number} className={Util.classNames("box", `box${number}`)}><div/></div>
                    ))}
                    <div className="ground"><div/></div>
                </div>
                <small className="block absolute bottom-45 text-2xl sm:text-5xl text-lightmodetext dark:text-darkmodetext text-center"> {Util.Constants.websiteApplicationName} </small>
            </Center>
        </>
    );
};

export default LoadingScreen;