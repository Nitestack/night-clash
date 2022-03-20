import type { FC } from "react";
import { motion } from "framer-motion";

export interface MotionProps {
    disablemotion?: boolean;
    disablehovermotion?: boolean;
};

const Motion: FC<MotionProps> = ({ children, disablemotion, disablehovermotion: disableHoverMotion }) => {
    if (disablemotion) return (
        <> {children} </>
    );
    return (
        <motion.div whileHover={disableHoverMotion ? undefined : { scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            {children}
        </motion.div>
    );
};
export default Motion;