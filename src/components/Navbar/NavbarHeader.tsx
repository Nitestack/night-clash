import { FC } from "react";
import Link from "@components/Link";

const NavbarHeader: FC = () => {
    return ( 
        <Link className="text-lightmodetext dark:text-darkmodetext font-bold text-3xl" href="/"> NightClash </Link>
    );
};
export default NavbarHeader;