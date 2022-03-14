import type { FC } from "react";
import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import Modal from "@components/Modal";
import type { RootState } from "src/configuration/Actions/index";
import Util from "@util/index";

const connector = connect((state: RootState) => {
    return state.error;
}, (dispatch) => {
    return {
        clearError: () => dispatch(Util.StateManagement.clearError())
    };
});

const ErrorModal: FC<ConnectedProps<typeof connector>> = (error) => {
    const { title, description, showModal } = error;
    useEffect(() => {
    }, [error])
    function closeModal() {
        error.clearError();
    };
    return (
        <Modal 
        show={showModal}
        title={title} 
        description={description}
        onModalClose={closeModal}
        onlyDismissButton/>
    );
};

export default connector(ErrorModal);