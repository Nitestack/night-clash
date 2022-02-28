import { NextPageWithConfiguration } from "@util/types";
import Accordion from "@components/Accordion";
import Center from "@components/Center";

const ExamplePage: NextPageWithConfiguration = () => {
    return (
        <>
            <Accordion title="Clash of Clans">
                <Center>
                    <img className="h-56" src="/Images/Clash of Clans Background.png"/>
                </Center>
            </Accordion>
            <Accordion title="Clash Royale">
                <Center>
                    <img className="h-56" src="/Images/Clash Royale Background.png"/>
                </Center>
            </Accordion>
            <Accordion title="Brawl Stars">
                <Center>
                    <img className="h-56" src="/Images/Brawl Stars Background.png"/>
                </Center>
            </Accordion>
        </>
    );
};
ExamplePage.title = "ExamplePage";

export default ExamplePage;