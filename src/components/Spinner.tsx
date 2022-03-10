import { FC } from "react";
import styles from "@components/Spinner.module.scss";

const Spinner: FC = () => {
    return (
        <div className={styles["lds-roller"]}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                <div key={number}/>
            ))}
        </div>
    );
};
export default Spinner;