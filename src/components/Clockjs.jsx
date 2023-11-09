import React, { Component } from 'react';
import './Clock.css';

class ClockWithNumbers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.updateClock(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    updateClock() {
        this.setState({
            time: new Date()
        });
    }

    render() {
        const { time } = this.state;
        const date = time.getDate();
        const month = time.getMonth()+1;
        const year = time.getFullYear();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        const hourDeg = (360 / 12) * (hours % 12) + (360 / 12) * (minutes / 60);
        const minuteDeg = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
        const secondDeg = (360 / 60) * seconds;

        const hourStyle = {
            transform: `rotate(${hourDeg + 90}deg)`
        };
        const minuteStyle = {
            transform: `rotate(${minuteDeg + 90}deg)`
        };
        const secondStyle = {
            transform: `rotate(${secondDeg + 90}deg)`
        };

        return (
            <div id='clock_form'>
                <div className="clock">
                    {Array.from({ length: 12 }, (_, index) => (
                        <div
                            key={index}
                            className={`number number${index + 1}`}
                        >
                            {index + 1}
                        </div>
                    ))}
                    <div className="hand hour-hand" style={hourStyle}></div>
                    <div className="hand minute-hand" style={minuteStyle}></div>
                    <div className="hand second-hand" style={secondStyle}></div>

                </div>
                <div className='clock_number'>
                    <p>{hours}:{minutes}:{seconds}</p>
                    <p>{date}/{month}/{year}</p>
                </div>
            </div>
        );
    }
}

export default ClockWithNumbers;
