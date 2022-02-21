import { FC } from "react";

const Center: FC = ({ children }) => {
    return (
        <div className="flex items-center justify-center">
            {children}
        </div>
    );
};
export default Center;