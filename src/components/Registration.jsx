import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useRef, useState } from "react";
import { registerUser } from "../resources/localStorage";
import '../styles/Registration.css'

const Registration = ({ isOn }) => {
    const loginInput = useRef();
    const passwordInput = useRef();
    const passwordRepeatInput = useRef();
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordRepeatError, setPasswordRepeatError] = useState('');


    const navigate = useNavigate();

    const validateLogin = () => {
        let isValid = true;
        const username = loginInput.current.value;
        const password = passwordInput.current.value;
        const repeatPassword = passwordRepeatInput.current.value;

        if (!username) {
            setUsernameError('Логін не може бути порожнім.')
            isValid = false;
        }
        if (username.length < 3 || username.length > 20) {
            isValid = false;
            setUsernameError("Логін повинен містити від 3 до 20 символів.");
        }

        if (!repeatPassword) {
            isValid = false;
            setPasswordRepeatError("Пароль повинен збігатися.");
        }

        if (repeatPassword !== password) {
            isValid = false;
            setPasswordRepeatError("Пароль повинен збігатися.")
        }

        if (!password) {
            isValid = false;
            setPasswordError("Пароль не може бути порожнім.");
        }
        if (password.length < 6) {
            isValid = false;
            setPasswordError("Пароль повинен містити принаймні 6 символів.");
        }
        if (!/\d/.test(password)) {
            isValid = false;
            setPasswordError("Пароль повинен містити принаймні одну цифру.");
        }

        return isValid;
    };

    const handleButtonClick = () => {
        if (validateLogin()) {
            if (registerUser(loginInput.current.value, passwordInput.current.value)) {
                navigate('/');
            }
        }
    };

    return (
        <>
            <div className="registration-container">
                <div className={`registration-content ${isOn ? 'dark' : ''}`}>
                    <h3>Registration</h3>
                    <label htmlFor="">
                        <input placeholder="Login" type="text" ref={loginInput} />
                        <span className="error" style={{ color: 'red' }}>{usernameError}</span>
                    </label>
                    <label htmlFor="">
                        <input placeholder="Password" type="text" ref={passwordInput} />
                        <span className="error" style={{ color: 'red' }}>{passwordError}</span>
                    </label>
                    <label htmlFor="">
                        <input placeholder="Repeat password" type="text" ref={passwordRepeatInput} />
                        <span className="error" style={{ color: 'red' }}>{passwordRepeatError}</span>
                    </label>
                    <button className={`button ${isOn ? 'dark' : ''}`} onClick={handleButtonClick}>Login</button>
                    <Link to={'/'}>Sign in</Link>
                </div>
            </div>
        </>
    );
}

export default Registration;