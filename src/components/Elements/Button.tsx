import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import Util from "@util/index";
import { forwardRef } from "react";
import type { PropsWithChildren } from "react";

export type ButtonProps = HTMLMotionProps<"button">;



const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>((props, ref) => {
    return (
        <motion.button {...props} ref={ref} className={Util.classNames("w-full justify-center font-medium sm:w-auto sm:text-sm rounded-md border-2 border-transparent py-2 text-base px-3 inline-block text-center whitespace-nowrap align-middle select-none shadow-sm", props.className)} whileHover={{ scale: props.disabled ? undefined : 1.1 }} whileTap={{ scale: 0.9 }}/>
    );
});

export default Button;