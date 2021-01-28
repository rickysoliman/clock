import React from 'react';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Clock from './components/Clock.jsx';
import Timer from './components/Timer.jsx';
import Stopwatch from './components/Stopwatch.jsx';
import Alarm from './components/Alarm.jsx';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            time: ''
        }

        this.updateTime = this.updateTime.bind(this);
    }

    updateTime(time) {
        this.setState({ time });
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
                        <li><NavLink to="/alarm">Alarm</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" render={() => <Clock updateTime={this.updateTime}/>} />
                        <Route path="/timer" component={Timer} />
                        <Route path="/stopwatch" component={Stopwatch} />
                        <Route path="/alarm" component={Alarm} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;