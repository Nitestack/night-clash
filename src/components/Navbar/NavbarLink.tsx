import Link from "@components/Link";
import { FC } from "react";

const NavbarLink: FC<{ href: string }> = ({ href, children }) => {
    return ( 
        <Link href={href} className="text-base px-3 py-2 rounded-md font-medium text-lightmodetext dark:text-darkmodetext hover:text-hovertext hover:bg-hoverbackground md:text-base md:font-medium"
        > {children} </Link>
    );
};
export default NavbarLink;