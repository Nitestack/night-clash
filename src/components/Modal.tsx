import type { FC, MouseEvent } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@components/Button";
import type { ButtonProps } from "@components/Button";
import Spinner from "@components/Spinner";

const Modal: FC<{
    title: string;
    description: string;
    onSubmit?: (ev: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
    justShowXButton?: boolean;
    openButtonOptions?: ButtonProps;
}> = ({ title, description, children, onSubmit, justShowXButton, openButtonOptions }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    function openModal() {
        return () => setOpen(true);
    };
    function closeModal() {
        return () => setOpen(false);
    };
    function exitModal() {
        return (ev: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
            if (onSubmit) {
                setLoading(true);
                onSubmit(ev);
                setLoading(false);
            };
            setOpen(false);
        };
    };
    return (
        <>
            <Button {...openButtonOptions} onClick={openModal()}></Button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeModal()}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0" >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                        </Transition.Child>
                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"> &#8203; </span>
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" >
                            <div className="max-w-screen inline-block bg-lightmodeprimary dark:bg-darkmodeprimary rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-lightmodeprimary dark:bg-darkmodeprimary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-lightmodeheader dark:text-darkmodeheader text-center">
                                                {title}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-base text-lightmodetext dark:text-darkmodetext font-coc-description text-center">
                                                    {description}
                                                </p>
                                                {children}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-primary px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center">
                                    {justShowXButton ? <Button type="button" className="mt-3 w-full inline-flex justify-center rounded-md px-4 py-2 bg-red-700 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal()}>
                                        X
                                    </Button> : <>
                                        <Button type="button" className="w-full inline-flex justify-center rounded-md px-4 py-2 bg-green-500 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm" onClick={exitModal()}> {loading ? <Spinner></Spinner> : undefined} Okay </Button>
                                        <Button type="button" className="mt-3 w-full inline-flex justify-center rounded-md px-4 py-2 bg-red-700 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal()}> 
                                            Cancel 
                                        </Button>
                                    </>}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};
export default Modal;