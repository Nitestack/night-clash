import type { PropsWithChildren } from "react";
import NextLink from "next/link";
import omit from "omit";
import Motion from "@components/Utilities/Motion";
import type { MotionProps } from "@components/Utilities/Motion";
import { forwardRef } from "react";

type LinkProps = PropsWithChildren<JSX.IntrinsicElements["a"]> & MotionProps & { 
    href?: string 
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => ( 
    <Motion disablemotion={props.disablemotion} disablehovermotion={props.disablehovermotion}>
        <NextLink href={props.href || "/"}>
            <a ref={ref} {...omit(["href", "style"], props)} style={{ textDecoration: "none", ...props.style }}/>
        </NextLink>
    </Motion>
));

export default Link;