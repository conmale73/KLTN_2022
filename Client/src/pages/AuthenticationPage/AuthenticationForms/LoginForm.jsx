import styles from "./LoginForm.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services";
import * as Dialog from "@radix-ui/react-dialog";
import { userService } from "../../../services";
import { useQuery } from "@tanstack/react-query";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let [emailError, setEmailError] = useState([]);
    let [passwordError, setPasswordError] = useState([]);
    let [errorLogin, setErrorLogin] = useState("");

    const [openLogin, setOpenLogin] = useState(false);

    const navigator = useNavigate();
    const dispatch = useDispatch();

    const handleOnChangeEmail = (e) => {
        const newemail = e.target.value;
        setEmail(newemail);
        if (newemail.length < 1) {
            emailError.push("Email is required");
        } else {
            const errorToDelete = "Email is required";
            setEmailError(emailError.filter((err) => err !== errorToDelete));
        }
    };
    const handleOnChangePassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Define a regular expression to match only letters and numbers
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;

        if (!alphanumericRegex.test(newPassword)) {
            if (
                passwordError.includes(
                    "Password must contain only letters and numbers"
                )
            ) {
            } else {
                passwordError.push(
                    "Password must contain only letters and numbers"
                );
            }
        } else if (newPassword.length < 6) {
            if (
                passwordError.includes("Password must be at least 6 characters")
            ) {
            } else {
                passwordError.push("Password must be at least 6 characters");
            }
        } else if (newPassword.length > 20) {
            if (
                passwordError.includes(
                    "Password must be less than 20 characters"
                )
            ) {
            } else {
                passwordError.push("Password must be less than 20 characters");
            }
        } else {
            // Clear the error if the password is valid
            setPasswordError([]);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await authService.login(email, password);

            const token = response.data.token;
            localStorage.setItem("token", JSON.stringify(token));

            const user = response.data.user;
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(setUser(user));
            navigator("/profile");
        } catch (err) {
            console.error("Message:", err.response.data.message);
            setErrorLogin(err.response.data.message);
        }
    };

    const handleSubmitForm = (e) => {
        if (passwordError.length == 0 && emailError.length == 0) {
            console.log("Submit form");
            try {
                handleLogin();
            } catch (err) {
                console.log(err);
            } finally {
            }
        }
    };

    const handleStateModal = (e) => {
        setOpenLogin(!openLogin);
        setErrorLogin("");
    };
    const handleClickSubmit = (e) => {
        handleSubmitForm(e);
    };
    return (
        <div className={styles.loginForm}>
            <div className={styles.title}>
                <h1>Sign In</h1>
            </div>
            <form className={styles.form} onSubmit={(e) => handleSubmitForm(e)}>
                <div className={styles.input}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className={styles.inputField}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => handleOnChangeEmail(e)}
                    />
                    <ul className={styles.error}>
                        {emailError.map((err) => {
                            return <li className={styles.err}>{err}</li>;
                        })}
                    </ul>
                </div>
                <div className={styles.input}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        className={styles.inputField}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => handleOnChangePassword(e)}
                    />
                    <ul className={styles.error}>
                        {passwordError.map((err) => {
                            return <li className={styles.err}>{err}</li>;
                        })}
                    </ul>
                </div>
            </form>
            <div className={styles.button}>
                <Dialog.Root
                    open={openLogin}
                    onOpenChange={(e) => handleStateModal(e)}
                >
                    <Dialog.Trigger asChild>
                        <button
                            type="submit"
                            className={styles.loginButton}
                            onClick={(e) => handleClickSubmit(e)}
                        >
                            Sign In
                        </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
                        {errorLogin != "" && (
                            <Dialog.Content
                                className="data-[state=open]:animate-contentShow fixed top-[40%] 
                        left-[50%] max-h-[85vh] w-[90vw] max-w-[350px] translate-x-[-50%] translate-y-[-50%] 
                        rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                            >
                                <Dialog.Title className="text-red-600 m-0 text-[17px] font-medium">
                                    Error
                                </Dialog.Title>
                                <Dialog.Description className="text-black mt-[10px] mb-5 text-[15px] leading-normal">
                                    {errorLogin}
                                </Dialog.Description>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Dialog.Close asChild>
                                        <button
                                            className="text-black bg-blue-100 hover:bg-blue-400 focus:shadow-blue-600 
                                        inline-flex h-[35px] items-center justify-center self-end 
                                        rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                                        >
                                            Close
                                        </button>
                                    </Dialog.Close>
                                </div>
                            </Dialog.Content>
                        )}
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </div>
    );
};
export default LoginForm;
