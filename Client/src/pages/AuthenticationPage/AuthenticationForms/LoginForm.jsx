import styles from "./LoginForm.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services";
import { Toast } from "flowbite-react";
import { userService } from "../../../services";
import { useQuery } from "@tanstack/react-query";
import io from "socket.io-client";

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

            const socket = io("http://localhost:3000");
            socket.emit("addNewOnlineUser", user._id);
            io.on("go-online", (data) => {
                console.log(data);
            });
        } catch (err) {
            console.error("Message:", err.response.data.message);
            setErrorLogin(err.response.data.message);
        } finally {
            navigator("/social");
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
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
            <form
                id="signin-form"
                className={styles.form}
                onSubmit={(e) => handleSubmitForm(e)}
            >
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
                <button
                    form="signin-form"
                    type="submit"
                    className={styles.loginButton}
                    onClick={(e) => handleClickSubmit(e)}
                    autoFocus={true}
                >
                    Sign In
                </button>
            </div>
            {errorLogin && (
                <div className="flex justify-center">
                    <Toast className="bg-[#303030]">
                        <div className="ml-3 text-[15px] font-bold text-[#e4e6eb]">
                            {errorLogin}
                        </div>
                        <Toast.Toggle onDismiss={() => setErrorLogin("")} />
                    </Toast>
                </div>
            )}
        </div>
    );
};
export default LoginForm;
