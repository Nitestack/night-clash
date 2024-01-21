import type { FC } from "react";
import type { ClashRoyaleUpcomingChest } from "@graphql/types/index";
import Grid from "@components/Utilities/Grid";
import Image from "@components/Elements/Image";
import Tooltip from "@components/NewTooltip";
import Center from "@components/Utilities/Center";

const ClashRoyaleUpcomingChests: FC<{ chests: Array<ClashRoyaleUpcomingChest> }> = ({ chests }) => {
    return (
        <Grid className="grid-cols-3">
            {chests.map((chestItem) => (
                <Tooltip content={chestItem.name}>
                    <Center>
                        <Image className="w-32 h-32" src={`/Images/Clash Royale/Chests/${chestItem.name}.png`}/>
                    </Center>
                </Tooltip>
            ))}
        </Grid>
    );
};
export default ClashRoyaleUpcomingChests;