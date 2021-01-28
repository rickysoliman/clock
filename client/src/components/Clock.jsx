import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
    display: flex;
    justify-content: center;
    font-size: 5em;
    font-family: Arial;
`;

class Clock extends React.Component {
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
        this.props.updateTime(time);
        setTimeout(this.fetchTime, 1000);
    }

    render() {
        return (
            <Main>{this.state.time}</Main>
        )
    }
}

export default Clock;