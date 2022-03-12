import type { FC } from "react";
import { useState } from "react";
import Modal from "@components/Modal";

const ErrorModal: FC<{
    title?: string,
    description?: string
}> = ({ title, description }) => {
    
    return (
        <Modal 
        show={}
        title={title || "Error"} 
        description={description || "An unexspected error occurred! Please try again!"}
        onlyDismissButton/>
    );
};
export default ErrorModal;