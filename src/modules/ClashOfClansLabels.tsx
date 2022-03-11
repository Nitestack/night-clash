import type { APILabel } from "clashofclans.js";
import type { FC } from "react";
import Tooltip from "@components/Tooltip";
import Button from "@components/Button";
import ClashOfClansShareButton from "./ClashOfClansShareButton";

const ClashOfClansLabels: FC<{
    labels?: Array<APILabel>;
}> = ({ labels }) => {
    return (
        <>
            {labels ? labels.map((label) => 
            <Tooltip className="mr-1" key={label.id} toolTipNode={label.name}>
                <Button className="p-0">
                    <img className="w-12" title={label.name} src={label.iconUrls.small}/>
                </Button>
            </Tooltip>
            ) : undefined}
            <ClashOfClansShareButton/>
        </>
    );
};
export default ClashOfClansLabels;