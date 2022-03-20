import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import NextLink from "next/link";
import omit from "omit";
import Motion from "@components/Utilities/Motion";
import type { MotionProps } from "@components/Utilities/Motion";
import { forwardRef } from "react";

const Link = forwardRef<HTMLAnchorElement, DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & MotionProps & { href?: string }>(function(props, ref) {
    return ( 
        <Motion {...props}>
            <NextLink href={props.href || "/"}>
                <a ref={ref} {...omit(["href", "style"], props)} style={{ textDecoration: "none", ...props.style }}/>
            </NextLink>
        </Motion>
    );
});

export default Link;