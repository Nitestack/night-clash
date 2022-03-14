import type { FC } from "react";
import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import Modal from "@components/Modal";
import type { RootState } from "@actions/index";
import Util from "@util/index";

const connector = connect((state: RootState) => {
    return state.error;
}, (dispatch) => {
    return {
        clearError: () => dispatch(Util.StateManagement.clearError())
    };
});

type PropsFromRedux = ConnectedProps<typeof connector>;

const ErrorModal: FC<{
    title: string,
    description: string
} & PropsFromRedux> = (error) => {
    const testError = Util.StateManagement.useSelector(state => state.error);
    const { title, description, showModal } = error ? error : {
        title: "",
        description: "",
        showModal: false
    };
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