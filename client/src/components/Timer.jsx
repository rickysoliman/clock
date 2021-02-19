import React from 'react';
import styled from 'styled-components';

class Timer extends React.Component {
    constructor() {
        super();

        this.state = {
            on: false,
            hour: '00',
            minute: '00',
            second: '00'
        }

        this.hourChange = this.hourChange.bind(this);
        this.minuteChange = this.minuteChange.bind(this);
        this.secondChange = this.secondChange.bind(this);
        this.decrementTime = this.decrementTime.bind(this);
        this.start = this.start.bind(this);
    }

    hourChange(e) {
        let hour = e.target.value;
        this.setState({ hour });
    }

    minuteChange(e) {
        let minute = e.target.value;
        this.setState({ minute });
    }

    secondChange(e) {
        let second = e.target.value;
        this.setState({ second });
    }

    decrementTime() {
        let hour = Number(this.state.hour);
        let minute = Number(this.state.minute);
        let second = Number(this.state.second);

        if (hour === 0 && minute === 0 && second === 0) {
            this.setState({ on: false });
            return null;
        }

        second--;

        if (second < 0) {
            second = 59
            minute--;
            if (minute < 0) {
                minute = 59;
                hour--;
            }
        }

        if (second < 10) {
            second = `0${second}`;
        }
        if (minute < 10) {
            minute = `0${minute}`;
        }
        if (hour < 10) {
            hour = `0${hour}`;
        }

        this.setState({ hour, minute, second }, () => {
            setTimeout(this.decrementTime, 1000);
        });

        // this.setState({
        //     hour,
        //     minute,
        //     second
        // }, () => {
        //     if (second === 0) {
        //         if (minute === 0 && hour === 0) {
        //             this.setState({ on: false }, () => {
        //                 return null
        //             });
        //         }
        //     } else {
        //         setTimeout(this.decrementTime, 1000);
        //     }
        // });
    }

    start() {
        this.setState({ on: true }, () => {
            setTimeout(this.decrementTime, 1000);
        });
    }

    render() {
        let hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let hourOptions = hours.map(hour => {
            return <option value={hour}>{hour}</option>
        });
        let minutes = [];
        let seconds = [];
        for (let i = 0; i <= 59; i++) {
            let minute = i;
            if (minute < 10) {
                minute = `0${minute}`;
            }
            minutes.push(minute);
            seconds.push(minute);
        }
        let minuteOptions = minutes.map(minute => {
            return <option value={minute}>{minute}</option>
        });
        let secondOptions = seconds.map(second => {
            return <option value={second}>{second}</option>
        });
        return (
            <>
                <h1>{this.state.hour}:{this.state.minute}:{this.state.second}</h1>
                <form>
                    <h2>Set Timer</h2>
                    <label>
                        <select value={this.state.hour} onChange={this.hourChange}>
                            <option value="" selected disabled hidden>{this.state.hour}</option>
                            {hourOptions}
                        </select>
                        {this.state.hour > 1 ? 'hours' : 'hour'}
                    </label>
                    <label>
                        <select value={this.state.minute} onChange={this.minuteChange}>
                            <option value="" selected disabled hidden>{this.state.minute}</option>
                            {minuteOptions}
                        </select>
                        {this.state.minute > 1 ? 'minutes' : 'minute'}
                    </label>
                    <label>
                        <select value={this.state.second} onChange={this.secondChange}>
                            <option value="" selected disabled hidden>{this.state.second}</option>
                            {secondOptions}
                        </select>
                        {this.state.second > 1 ? 'seconds' : 'second'}
                    </label>
                    <button onClick={this.start}>Start</button>
                </form>
            </>
        )
    }
}

export default Timer;