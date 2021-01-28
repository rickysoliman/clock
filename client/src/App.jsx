import React from 'react';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Clock from './components/Clock.jsx';
import Timer from './components/Timer.jsx';
import Stopwatch from './components/Stopwatch.jsx';

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Clock</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Clock</NavLink></li>
                        <li><NavLink to="/timer">Timer</NavLink></li>
                        <li><NavLink to="/stopwatch">Stopwatch</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Clock} />
                        <Route path="/timer" component={Timer} />
                        <Route path="/stopwatch" component={Stopwatch} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;