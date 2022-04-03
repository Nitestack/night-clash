import type { FC } from "react";
import Link from "@components/Elements/Link";
import Image from "@components/Elements/Image";

const NavbarHeader: FC = () => {
    return ( 
        <Link className="w-60 h-6" href="/">
            <Image className="w-60 h-10" src="/Images/logo.png"/>
        </Link>
    );
};
export default NavbarHeader;