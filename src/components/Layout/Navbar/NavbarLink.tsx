import Link from "@components/Elements/Link";
import type { FC } from "react";

const NavbarLink: FC<{ href: string }> = ({ href, children }) => {
    return ( 
        <Link href={href} className="text-base px-3 py-2 rounded-md font-medium text-lightmodetext dark:text-darkmodetext hover:text-hovertext hover:bg-hoverbackground"> {children} </Link>
    );
};
export default NavbarLink;