import type { FC } from "react";
import Header from "@modules/AccountDashboard/Header";
import { useAuth } from "@util/hooks";
import { useState, useRef } from "react";
import Util from "@util/index";
import validator from "validator";
import Body from "@modules/AccountDashboard/Body";
import Center from "@components/Utilities/Center";
import Button from "@components/Elements/Button";
import Input from "@components/Elements/Input";
import { CheckIcon, PencilIcon } from "@heroicons/react/solid";

const AccountInformation: FC<{  }> = ({  }) => {
    //User Data
    const { user, editUser } = useAuth();
    //State variables for editing user credentials
    const [username, setUsername] = useState<string>(user?.displayName!);
    const [email, setEmail] = useState<string>(user?.email!);
    //Mode: view mode and set mode
    const [editUsernameMode, setEditUsernameMode] = useState(false);
    const [editEmailMode, setEditEmailMode] = useState(false);
    //Refs
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    //Username
    function setUsernameEditMode() {
        return () => {
            setEditUsernameMode(!editUsernameMode);
        };
    };
    function saveUsername() {
        return async () => {
            if (usernameRef.current) {
                const newUsername = usernameRef.current.value;
                if (!newUsername) return Util.toast.error("Please enter a new username!");
                if (newUsername == username) return setEditUsernameMode(false);
                editUser({
                    name: newUsername
                }).then(() => {
                    Util.toast.success(`Successfully changed username to: ${newUsername}!`);
                    setUsername(newUsername);
                    setEditUsernameMode(false);
                });
            };
        };
    };
    //Email
    function setEmailEditMode() {
        return () => {
            setEditEmailMode(!editEmailMode);
        };
    };
    function saveEmail() {
        return async () => {
            if (emailRef.current) {
                const newEmail = emailRef.current.value;
                if (!newEmail) return Util.toast.error("Please enter a new email!");
                if (!validator.isEmail(newEmail)) return Util.toast.error("Please enter a valid email!");
                editUser({
                    email: newEmail
                }).then(() => {
                    Util.toast.success(`Successfully changed E-Mail to: ${newEmail}!`);
                    setEmail(newEmail);
                    setEditEmailMode(false);
                });
            };
        };
    };
    return (
        <>
            <Header header="Account Information" description="Personal details and data"/>
            <Body categories={{
                "Username": {
                    headerProps: {
                        children: 
                            <Button onClick={setUsernameEditMode()} className="p-2 w-7">
                                <PencilIcon className="w-5"/>
                            </Button>
                    },
                    content: editUsernameMode ? 
                        <Center className="justify-start sm:col-span-2">
                            <Input type="text" defaultValue={username} ref={usernameRef}/>
                            <Button className="bg-green-500 p-2 w-7" onClick={saveUsername()}>
                                <CheckIcon className="w-5"/>
                            </Button>
                        </Center> : 
                        <dd className="mt-1 text-lg font-coc-description sm:mt-0 sm:col-span-2"> {username} </dd>
                },
                "E-Mail Address": {
                    headerProps: {
                        children: 
                            <Button onClick={setEmailEditMode()} className="p-2 w-7">
                                <PencilIcon className="w-5"/>
                            </Button>
                    },
                    content: editEmailMode ? 
                        <Center className="justify-start sm:col-span-2">
                            <Input type="text" defaultValue={email} ref={emailRef}/>
                            <Button className="bg-green-500 p-2 w-7" onClick={saveEmail()}>
                                <CheckIcon className="w-5"/>
                            </Button>
                        </Center> : 
                        <dd className="mt-1 text-lg font-coc-description sm:mt-0 sm:col-span-2"> {email} </dd>
                }
            }}/>
        </>
    );
};
export default AccountInformation;