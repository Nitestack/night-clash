import styles from "@components/Utilities/Spinner.module.scss";
import { forwardRef } from "react";

const Spinner = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div ref={ref} className={styles["lds-roller"]}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                <div key={number}/>
            ))}
        </div>
    );
});

export default Spinner;