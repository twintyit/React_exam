import React from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUserExistence } from "../resources/localStorage";
import { icons } from "../resources/icons";
import '../styles/Authorization.css'

const Authorization = ({ isOn }) => {
    const loginInput = useRef();
    const passwordInput = useRef();
    const navigate = useNavigate();

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateLogin = () => {
        let isValid = true;
        const username = loginInput.current.value;
        const password = passwordInput.current.value;

        if (!username) {
            setUsernameError('Логін не може бути порожнім.')
            isValid = false;
        }
        if (username.length < 3 || username.length > 20) {
            isValid = false;
            setUsernameError("Логін повинен містити від 3 до 20 символів.");
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

    const click = (event) => {
        setUsernameError('');
        setPasswordError('');

        event.preventDefault();
        if (validateLogin()) {
            const username = checkUserExistence(loginInput.current.value, passwordInput.current.value);
            if (username) {

                navigate(`/${username}/menu`);
            } else {
                setPasswordError('Incorrect password');
                passwordInput.current.value = '';
            }
        }
    }

    return (
        <>
            <form action="" className="authorization-form">
                <div className="authorization-container">
                    <div className="authorization-left">
                        <h2>Memory game</h2>
                        <p className={`authorization-text ${isOn ? 'dark' : ''}`}>Open all cards in the minimum number of moves! Good luck!</p>
                        <div className="icons-authorization">
                            {icons.map((icon, index) => (
                                (index % 6 === 0) && (
                                    <div key={index}>
                                        <img width={110} src={icon} alt="" />
                                    </div>
                                )
                            ))}
                        </div>

                    </div>
                    <div className={`authorization-right ${isOn ? 'dark' : ''}`}>
                        <h2>Login Memory game</h2>
                        <label htmlFor="">
                            <input placeholder="Login" type="text" ref={loginInput} />
                            <span className="error" style={{ color: 'red' }}>{usernameError}</span>
                        </label>
                        <label htmlFor="">
                            <input placeholder="Password" type="password" ref={passwordInput} />
                            <span className="error" style={{ color: 'red' }}>{passwordError}</span>
                        </label>
                        <button className={`button ${isOn ? 'dark' : ''}`} onClick={click}>Submit</button>
                        <Link to="/registration">registration</Link>
                    </div>
                </div>
            </form >
        </>
    );
}

export default Authorization;