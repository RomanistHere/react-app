import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import { useHistory } from "react-router-dom";

export default function Login() {
    const { userHasAuthenticated } = useAppContext();
    const history = useHistory();
    const [state , setState] = useState({
        email : "",
        password : "",
        isError: false
    });

    // useEffect(() => {
    //     handleSubmit();
    // }, []);

    const handleChange = (e) => {
        const { id , value } = e.target;
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
    }

    const showErr = () => {
        setState(prevState => ({
            ...prevState,
            isError : true
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const resp = await fetch('https://playground.tesonet.lt/v1/tokens', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // username: "tesonet",
                    // password: "partyanimal"
                    username: state.email,
                    password: state.password
                })
            });

            if (!resp.ok) {
                showErr();
                return;
            }

            const { token } = await resp.json();

            userHasAuthenticated(token);
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', JSON.stringify(token));
            }
            history.push("/main/");
        } catch (e) {
            showErr()
        }
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <div className="input-group">
                <label className="login__label" htmlFor="email">Username</label>
                <input
                    type="email"
                    className="login__input"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email or username"
                    value={state.email}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group">
                <label className="login__label" htmlFor="password">Password</label>
                <input
                    type="password"
                    className="login__input"
                    id="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                />
            </div>

            <button
                type="button"
                onClick={handleSubmit}
                className="login__btn">Login</button>

            {
                state.isError && <span className="login__err">
                    Something is wrong, try again or come later
                </span>
            }
        </form>
    );
}
