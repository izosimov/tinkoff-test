import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart/Chart';

// coords = [day, dollarValue]
// const COORDS = [[1, 65], [2, 63], [3, 60], [4, 64], [5, 64], [6, 64], [7, 65], [8, 66], [9, 67], [10, 66], [11, 60], [20, 70], [30, 50], [40, 50], [50, 30], [60, 35], [70, 70], [80, 64], [90, 55], [100, 54], [110, 54], [120, 63], [220, 58], [260, 73], [300, 43], [350, 48], [363, 78]];


class App extends Component {
    render() {
        const a = 364;
        const data = [];
        for (let i = 1; i < a; i += 10) {
            data.push([i, Math.floor(Math.random() * 80)])
        }

        return (
            <div className='App'>
                <Chart data={data} />
            </div>
        );
    }
}

export default App;