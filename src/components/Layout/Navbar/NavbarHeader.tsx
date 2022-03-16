import type { FC } from "react";
import Link from "@components/Elements/Link";

const NavbarHeader: FC = () => {
    return ( 
        <Link className="text-lightmodetext dark:text-darkmodetext font-bold text-3xl" href="/">
            <img src="/Images/logo.png"/>
        </Link>
    );
};
export default NavbarHeader;