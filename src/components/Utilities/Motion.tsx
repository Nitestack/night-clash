import type { FC } from "react";
import { motion } from "framer-motion";

export interface MotionProps {
    disablemotion?: boolean;
    disablehovermotion?: boolean;
};

const Motion: FC<MotionProps> = ({ children, disablemotion, disablehovermotion }) => {
    if (disablemotion) return (
        <> {children} </>
    );
    else return (
        <motion.div whileHover={disablehovermotion ? undefined : { scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            {children}
        </motion.div>
    );
};
export default Motion;