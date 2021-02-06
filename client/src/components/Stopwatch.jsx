import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
    display: flex;
    justify-content: center;
`;

const Time = styled.div`
    display: inline-block;
    margin: auto;
    font-size: 5em;
    font-family: Arial;
`;

const Button = styled.button`
    background-color: ${props => props.on ? 'red' : 'green'};
    border: none;
    border-radius: 10px;
    width: fit-content;
    height: fit-content;
    font-size: 0.5em;
    color: white;
    &:hover {
        cursor: pointer;
    }
`;

const Reset = styled.button`
    background-color: #E0E0E0;
    border: none;
    border-radius: 10px;
    width: fit-content;
    height: fit-content;
    font-size: 0.5em;
    &:hover {
        cursor: pointer;
    }
`;

class Stopwatch extends React.Component {
    constructor() {
        super();

        this.state = {
            on: false,
            time: '00:00:00'
        }

        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.incrementTime = this.incrementTime.bind(this);
        this.startTime = this.startTime.bind(this);
        this.reset = this.reset.bind(this);
    }

    toggleStopwatch() {
        if (this.state.on) {
            this.setState({ on: false });
        } else {
            this.setState({ on: true }, () => {
                this.startTime();
            });
        }
    }
    
    incrementTime() {
        if (this.state.on) {
            var time = this.state.time.split(':');
            var hour = Number(time[0]);
            var minute = Number(time[1]);
            var second = Number(time[2]);
            second++;
            if (second === 60) {
                second = 0;
                minute++;
                if (minute === 60) {
                    minute = 0;
                    hour++;
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
            var newTime = `${hour}:${minute}:${second}`;
            this.setState({ time: newTime });
            setTimeout(this.incrementTime, 1000);
        }
    }

    startTime() {
        setTimeout(this.incrementTime, 1000);
    }

    reset() {
        this.setState({
            on: false,
            time: '00:00:00'
        });
    }

    render() {
        return (
            <Main>
                <Time>
                    {this.state.time}
                    <Button on={this.state.on} onClick={this.toggleStopwatch}>{this.state.on ? 'Stop' : 'Start'}</Button>
                    <Reset onClick={this.reset}>Reset</Reset>
                </Time>
            </Main>
        )
    }
}

export default Stopwatch;