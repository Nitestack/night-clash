import { useEffect, forwardRef } from "react";
import { useDisclosure } from "@mantine/hooks";
import Motion from "@components/Utilities/Motion";
import { Switch } from "@headlessui/react";
import Util from "@util/index";
import Center from "./Utilities/Center";

const Toggler = forwardRef<HTMLButtonElement, { on: string; off: string; onLoad?: (handlers: { readonly open: () => void; readonly close: () => void; readonly toggle: () => void; }) => void; onChange?: (checked: boolean) => void; }>(({ onLoad, onChange, on, off }, ref) => {
    const [checked, handlers] = useDisclosure(false);
    useEffect(() => {
        if (onLoad) onLoad(handlers);
    }, []);
    function changeSwitch() {
        return (checked: boolean) => {
            checked ? handlers.open() : handlers.close();
            if (onChange) onChange(checked);
        };
    };
    return (
        <Switch.Group>
            <Center>
                <Switch.Label className="mr-4">
                    {checked ? on : off}
                </Switch.Label>
                <Motion>
                    <Switch ref={ref}
                        checked={checked}
                        onChange={changeSwitch()}
                        className={Util.classNames(checked ? "bg-blue-600" : "bg-gray-200", "relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none")}>
                        <span className={Util.classNames(checked ? "translate-x-6" : "translate-x-1", "inline-block w-4 h-4 transform bg-lightmodetext dark:bg-darkmodetext rounded-full transition-transform")}/>
                    </Switch>
                </Motion>
            </Center>
        </Switch.Group>
    );
});

export default Toggler;