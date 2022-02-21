import { FC } from "react";
import Toggler from "@components/Toggler";
import Util from "@util/index";

const NavbarToggler: FC<{ isMobile?: boolean }> = ({ isMobile }) => {
    return (
        <div className={isMobile ? "" : "hidden md:block md:flex-1"}>
            <Toggler
                on="Dark"
                off="Light"
                onLoad={(setChecked) => {
                    const mode = Util.getCookie("mode");
                    setChecked(mode == "dark" ? true : false);
                }}
                onChange={(checked) => {
                    Util.setCookie("mode", checked ? "dark" : "light", 730, "/");
                    if (checked) $(document.documentElement).addClass("dark");
                    else $(document.documentElement).removeClass("dark");
                }}
            ></Toggler>
        </div>
    );
};
export default NavbarToggler;