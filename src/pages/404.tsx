import { NextPageWithConfiguration } from "@util/types";
import Link from "@components/Link";

const Custom404Page: NextPageWithConfiguration = () => {
    return (<Link href="/"/>);
};
Custom404Page.title = "404 - Not Found";
Custom404Page.description = "This site does not exist!";
Custom404Page.header = "404";

export default Custom404Page;