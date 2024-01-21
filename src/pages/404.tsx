import type { NextPageWithConfiguration } from "types";
import Link from "@components/Elements/Link";
import Button from "@components/Elements/Button";
import { useTitle, useDescription, useHeader } from "@util/hooks";

const Custom404Page: NextPageWithConfiguration = () => {
    //Layout hooks
    const { setTitle } = useTitle();
    const { setDescription } = useDescription();
    const { setHeader } = useHeader();
    setTitle("404 - Not Found");
    //Page Information
    setDescription("This site does not exist!");
    setHeader("404");
    return (
        <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
            <div className="w-full lg:w-1/2">
                <img
                    className="hidden lg:block"
                    src="https://i.ibb.co/v30JLYr/Group-192-2.png"
                    alt=""
                />
                <img
                    className="hidden md:block lg:hidden"
                    src="https://i.ibb.co/c1ggfn2/Group-193.png"
                    alt=""
                />
                <img
                    className="md:hidden"
                    src="https://i.ibb.co/8gTVH2Y/Group-198.png"
                    alt=""
                />
            </div>
            <div className="w-full lg:w-1/2">
                <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-lightmodetext dark:text-darkmodetext">
                    Looks like you&apos;ve found the doorway to the great
                    nothing
                </h1>
                <p className="py-4 text-lg text-lightmodetext dark:text-darkmodetext font-coc-description">
                    The content you&apos;re looking for doesn&apos;t exist.
                    Either it was removed, or you mistyped the link.
                </p>
                <p className="py-2 text-lg text-lightmodetext dark:text-darkmodetext font-coc-description">
                    Sorry about that! Please visit our hompage to get where you
                    need to go.
                </p>
                <Link href="/" disablemotion>
                    <Button className="bg-primary w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 text-white">
                        Go back to Homepage
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Custom404Page;
