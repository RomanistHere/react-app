import React, { useState, useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import { useHistory } from "react-router-dom";

export default function Main() {
    const defRevState = {
        name: false,
        distance: false
    };
    const history = useHistory();
    const { isAuthenticated } = useAppContext();
    const [servers, setServers] = useState([]);
    const [stateRev, setStateRev] = useState(defRevState);
    const [tokenFromStorage, setToken] = useState(typeof window !== 'undefined' ?
		(JSON.parse(localStorage.getItem('token')) == null ? false : JSON.parse(localStorage.getItem('token'))) : false)

    useEffect(() => {
        fetchInfo();
    }, [isAuthenticated]);

    const fetchInfo = async () => {
        const token = tokenFromStorage ? tokenFromStorage :
            isAuthenticated ? isAuthenticated : null

        if (!token) {
            history.push("/");
        }

        try {
            const myHeaders = new Headers({
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            });

            const resp = await fetch('https://playground.tesonet.lt/v1/servers', {
                method: 'GET',
                headers: myHeaders
            });

            const content = await resp.json();
            setServers(content);
        } catch (e) {
            history.push("/");
        }
    }

    const sortBy = (property) => {
        return function(a, b){
            if (a[property] < b[property]) {
                return -1;
            } else if (a[property] > b[property]) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    const sort = (e) => {
        e.preventDefault();
        const { id } = e.currentTarget;
        const sorted = stateRev[id] ? servers.sort(sortBy(id)).reverse() : servers.sort(sortBy(id));
        setServers([...sorted]);
        setStateRev(prevState => ({
            ...defRevState,
            [id] : !prevState[id]
        }));
    }

    return (
        <div className="grid">
            <div className="grid__row">
                <a
                    href="#"
                    onClick={sort}
                    id="name"
                    className="grid__left grid__sort">
                    Name {stateRev['name'] ? '↓' : '↑'}
                </a>

                <a
                    href="#"
                    onClick={sort}
                    id="distance"
                    className="grid__right grid__sort">
                    Distance {stateRev['distance'] ? '↓' : '↑'}
                </a>
            </div>
            {
                servers.map((item, i) => {
                    return  <div key={`${item.name}x${item.distance}`} className="grid__row">
                                <span className="grid__left">{item.name}</span>
                                <span className="grid__right">{item.distance}</span>
                            </div>
                })
            }
        </div>
    );
}
