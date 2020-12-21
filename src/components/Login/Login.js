import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import { useHistory } from "react-router-dom";

export default function Login() {
    const { userHasAuthenticated } = useAppContext();
    const history = useHistory();
    const [state , setState] = useState({
        email : "",
        password : ""
    });

    useEffect(() => {
        handleSubmit();
    }, []);

    const handleChange = (e) => {
        const { id , value } = e.target;
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
    }

    const handleSubmit = async (event) => {
        console.log('handleSubmit')
        // event.preventDefault();
        const resp = await fetch('https://playground.tesonet.lt/v1/tokens', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: "tesonet",
                password: "partyanimal"
                // username: state.email,
                // password: state.password
            })
        });
        const { token } = await resp.json();
        userHasAuthenticated(token);
        history.push("/main/");
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Username</label>
                    <input
                        type="email"
                        className="login__input"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
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
            </form>
        </div>
    );
}
