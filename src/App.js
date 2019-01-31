import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart/Chart';

let arr = [];
for (let i=0; i<365; i += 9) {
    arr.push([i, Math.floor(Math.random() * 100)]);
}

const POINTS = [...arr];

class App extends Component {
    render() {
        return (
            <div className='App'>
                <Chart points={POINTS} />
            </div>
        );
    }
}

export default App;