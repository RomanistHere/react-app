import './App.css';

import React, { useState } from "react";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";

const App = () => {
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    return (
        <div className="App">
            {/* <header className="App-header">
                Server explorer app
            </header> */}
            <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
                <Routes />
            </AppContext.Provider>
        </div>
    );
}

export default App;
