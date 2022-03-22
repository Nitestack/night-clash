import type { FC } from "react";
import Toggler from "@components/Toggler";
import Util from "@util/index";

const NavbarToggler: FC<{ isMobile?: boolean }> = ({ isMobile }) => {
    const dispatch = Util.StateManagement.useDispatch();
    function changeMode() {
        return (checked: boolean) => {
            Util.setCookie("mode", checked ? "dark" : "light", 730, "/");
            dispatch(Util.StateManagement.changeMode());
            if (checked) document.documentElement.classList.add("dark");
            else document.documentElement.classList.remove("dark");
        };
    };
    return (
        <div className={isMobile ? "" : "hidden md:block md:flex-1"}>
            <Toggler
                on="Dark"
                off="Light"
                onLoad={(handlers) => {
                    const mode = Util.getCookie("mode");
                    if (mode == "dark") handlers.open();
                }}
                onChange={changeMode()}
            ></Toggler>
        </div>
    );
};
export default NavbarToggler;