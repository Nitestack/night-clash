import { FC } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export type ButtonProps = HTMLMotionProps<"button">;

const Button: FC<ButtonProps> = (props) => {
    return (
        <motion.button className="w-full justify-center font-medium sm:w-auto sm:text-sm rounded-md border-2 border-transparent py-2 text-base px-3 inline-block text-center whitespace-nowrap align-middle select-none shadow-sm" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} {...props}/>
    );
};
export default Button;