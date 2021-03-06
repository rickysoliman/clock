import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

const Alarms = styled.div`
    font-family: Arial;
    width: fit-content;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;

class Alarm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alarms: [],
            hour: '',
            minute: '',
            daytime: '',
            label: ''
        }

        this.sortByTime = this.sortByTime.bind(this);
        this.fetchAlarms = this.fetchAlarms.bind(this);
        this.hourChange = this.hourChange.bind(this);
        this.minuteChange = this.minuteChange.bind(this);
        this.daytimeChange = this.daytimeChange.bind(this);
        this.labelChange = this.labelChange.bind(this);
        this.saveAlarm = this.saveAlarm.bind(this);
        this.checkForAlerts = this.checkForAlerts.bind(this);
    }

    componentWillMount() {
        this.fetchAlarms();
        this.checkForAlerts();
    }

    sortByTime(array) {
        array.sort((a, b) => {
            return Date.parse('06/21/1992 ' + a.time) - Date.parse('06/21/1992 ' + b.time);
        });
        return array;
    }

    fetchAlarms() {
        axios.get('/api/alarms')
            .then(res => {
                var alarms = res.data;
                alarms = this.sortByTime(alarms);
                for (let i = 0; i < alarms.length; i++) {
                    alarms[i] = JSON.stringify(alarms[i]);
                }
                this.setState({ 
                    alarms,
                    hour: '',
                    minute: '',
                    daytime: '',
                    label: ''
                });
            })
            .catch(err => {
                console.log(err.stack);
            });
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            currentTime: newProps.currentTime
        });
    }

    hourChange(e) {
        var hour = e.target.value;
        this.setState({ hour });
    }

    minuteChange(e) {
        var minute = e.target.value;
        this.setState({ minute });
    }

    daytimeChange(e) {
        var daytime = e.target.value;
        this.setState({ daytime });
    }

    labelChange(e) {
        var label = e.target.value;
        this.setState({ label });
    }

    saveAlarm() {
        if (this.state.hour === '' || this.state.minute === '' || this.state.daytime === '') {
            return null;
        }
        var alarm = {
            time: `${this.state.hour}:${this.state.minute} ${this.state.daytime}`,
            label: this.state.label
        };

        axios.post('/api/alarms', alarm)
            .then(res => {
                console.log('success');
                this.fetchAlarms();
            })
            .catch(err => {
                console.log(err.stack);
            });
    }

    checkForAlerts() {
        var currentTime = this.props.currentTime.split(':');
        var hour = currentTime[0];
        var minute = currentTime[1];
        var second = currentTime[2].split(' ')[0];
        var daytime = currentTime[2].split(' ')[1];
        currentTime = `${hour}:${minute} ${daytime}`;
        for (let i = 0; i < this.state.alarms.length; i++) {
            var current = JSON.parse(this.state.alarms[i]);
            if (current.time === currentTime && second === '00') {
                window.alert(`It's time to ${current.label}!`);
                break;
            }
        }
        setTimeout(this.checkForAlerts, 1000);
    }

    render() {
        var hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var hourOptions = hours.map(hour => {
            return <option value={hour}>{hour}</option>
        });
        var minutes = [];
        for (let i = 0; i <= 59; i++) {
            var minute = i;
            if (minute < 10) {
                minute = `0${minute}`;
            }
            minutes.push(minute);
        }
        var minuteOptions = minutes.map(minute => {
            return <option value={minute}>{minute}</option>
        });
        var daytimes = ['AM', 'PM'];
        var daytimeOptions = daytimes.map(daytime => {
            return <option value={daytime}>{daytime}</option>
        });
        var alarms = this.state.alarms.map(alarm => {
            alarm = JSON.parse(alarm);
            var time = alarm.time;
            var label = alarm.label;
            return label === '' ? <Alarms>{time}</Alarms> : <Alarms>{time}: {label}</Alarms>
        });
        return (
            <>
                <div>{alarms}</div>
                <form>
                    <h1>New Alarm</h1>
                    <label>
                        <select value={this.state.hour} onChange={this.hourChange}>
                            <option value="" selected disabled hidden>{this.state.hour}</option>
                            {hourOptions}
                        </select>
                        :
                    </label>
                    <label>
                        <select value={this.state.minute} onChange={this.minuteChange}>
                            <option value="" selected disabled hidden>{this.state.minute}</option>
                            {minuteOptions}
                        </select>
                        {' '}
                    </label>
                    <label>
                        <select value={this.state.daytime} onChange={this.daytimeChange}>
                            <option value="" selected disabled hidden>{this.state.daytime}</option>
                            {daytimeOptions}
                        </select>
                    </label>
                    <label>
                        <input placeholder="What is this alarm for?" value={this.state.label} onChange={this.labelChange}></input>
                    </label>
                    <button onClick={this.saveAlarm}>Save</button>
                </form>
            </>
        )
    }
}

export default Alarm;