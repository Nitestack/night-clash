import { useEffect, useState } from "react";
import type { FC, Dispatch, SetStateAction } from "react";
import Motion from "@components/Motion";
import { Switch } from "@headlessui/react";
import Util from "@util/index";

const Toggler: FC<{
    on: string;
    off: string;
    onLoad?: (setChecked: Dispatch<SetStateAction<boolean>>) => void;
    onChange?: (checked: boolean) => void;
}> = ({ onLoad, onChange, on, off }) => {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        if (onLoad) onLoad(setChecked);
    }, []);
    return (
        <Switch.Group>
            <div className="flex items-center">
                <Switch.Label className="mr-4">
                    {checked ? on : off}
                </Switch.Label>
                <Motion>
                    <Switch
                        checked={checked}
                        onChange={(checked) => {
                            setChecked(checked);
                            if (onChange) onChange(checked);
                        }}
                        className={Util.classNames(checked ? "bg-blue-600" : "bg-gray-200", "relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none")}>
                        <span className={Util.classNames(checked ? "translate-x-6" : "translate-x-1", "inline-block w-4 h-4 transform bg-lightmodetext dark:bg-darkmodetext rounded-full transition-transform")}/>
                    </Switch>
                </Motion>
            </div>
        </Switch.Group>
    );
};
export default Toggler;