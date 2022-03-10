import { FC, AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import NextLink from "next/link";
import omit from "omit";
import Motion, { MotionProps } from "@components/Motion";

const Link: FC<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
& MotionProps & { href?: string }> = (props) => {
    return ( 
        <Motion {...props}>
            <NextLink href={props.href || "/"}>
                <a {...omit(["href", "style"], props)} style={{ textDecoration: "none", ...props.style }}/>
            </NextLink>
        </Motion>
    );
};

export default Link;