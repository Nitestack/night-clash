import { forwardRef } from "react";
import type { PropsWithChildren } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import Util from "@util/index";
import omit from "omit";

type ImageProps = PropsWithChildren<{
    src: string;
    className: string;
}> & NextImageProps;

const Image = forwardRef<HTMLDivElement, ImageProps>((props, ref) => {
    const { className } = props;
    return (
        //Tailwind CSS base styles
        <div className={Util.classNames("relative max-w-full h-auto block align-middle", className)} ref={ref}>
            <NextImage layout="fill" {...omit("className", props)}/>
        </div>
    );
});

export default Image;