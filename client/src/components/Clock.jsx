import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
    display: flex;
    justify-content: center;
    font-size: 5em;
    font-family: Arial;
`;

class Clock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: this.props.currentTime
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            time: newProps.currentTime
        });
    }

    render() {
        if (this.state.time === '') {
            return null;
        }
        return (
            <Main>{this.state.time}</Main>
        )
    }
}

export default Clock;