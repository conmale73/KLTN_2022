import styles from "./RegisterForm.module.scss";
import { useState } from "react";
const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let [usernameError, setUsernameError] = useState([]);
    let [emailError, setEmailError] = useState([]);
    let [passwordError, setPasswordError] = useState([]);

    const handleOnChangeUsername = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);

        if (newUsername.length < 1) {
            usernameError.push("Username is required");
        } else {
            const errorToDelete = "Username is required";
            setUsernameError(
                usernameError.filter((err) => err !== errorToDelete)
            );
        }
    };
    const handleOnChangeEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (newEmail.length < 1) {
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
    const handleSubmitForm = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            email: email,
            password: password,
            registration_date: Date.now(),
        };
    };

    return (
        <div className={styles.registerForm}>
            <div className={styles.title}>
                <h1>Sign Up</h1>
            </div>
            <div className={styles.form} onSubmit={(e) => handleSubmitForm(e)}>
                <div className={styles.input}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className={styles.inputField}
                        type="text"
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
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        className={styles.inputField}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => handleOnChangeUsername(e)}
                    />
                    <ul className={styles.error}>
                        {usernameError.map((err) => {
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
                <div className={styles.button}>
                    <button className={styles.signupButton} type="submit">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};
export default RegisterForm;
