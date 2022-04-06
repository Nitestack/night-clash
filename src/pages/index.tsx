import type { NextPageWithConfiguration } from "@util/types";
import Util from "@util/index";
import { useTitle, useDescription } from "@util/hooks";
import Home from "@modules/Home";

const HomePage: NextPageWithConfiguration = () => {
    //Layout hooks
    const { setTitle } = useTitle();
    const { setDescription } = useDescription();
    //Page info
    setTitle("Home", true);
    setDescription(`${Util.Constants.APPLICATION_NAME} ${Util.Constants.APPLICATION_DESCRIPTION}`);
    return (
        <Home/>
    );
};

export default HomePage;