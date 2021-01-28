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

        this.fetchTime = this.fetchTime.bind(this);
    }

    componentWillMount() {
        this.fetchTime();
    }

    fetchTime() {
        var date = new Date();
        var daytime = 'AM';
        var hour = date.getHours();
        if (hour >= 12 && hour <= 23) {
            daytime = 'PM'
            if (hour > 12) {
                hour -= 12;
            }
        }
        var minute = date.getMinutes();
        if (minute < 10) {
            minute = `0${minute}`;
        }
        var second = date.getSeconds();
        if (second < 10) {
            second = `0${second}`;
        }
        var time = `${hour}:${minute}:${second} ${daytime}`;
        this.setState({
            time
        });
        setTimeout(this.fetchTime, 1000);
    }

    render() {
        if (this.state.time === '') {
            return null;
        }
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
                        <Route exact path="/" render={() => <Clock currentTime={this.state.time}/>} />
                        <Route path="/timer" component={Timer} />
                        <Route path="/stopwatch" component={Stopwatch} />
                        <Route path="/alarm" render={() => <Alarm currentTime={this.state.time}/>} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;