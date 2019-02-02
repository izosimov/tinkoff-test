import React, {Component} from 'react';
import './Chart.css';
import InfoCard from './../InfoCard/InfoCard.js';

// coords = [day, dollarValue]
const COORDS = [[0, 65], [1, 63], [2, 60], [3, 64], [4, 64], [5, 64], [6, 65], [7, 66], [8, 67], [9, 66], [10, 60], [20, 70], [30, 50], [40, 50], [50, 30], [60, 35], [70, 70], [80, 64], [90, 55], [100, 54], [110, 54], [120, 63], [220, 58], [260, 73], [300, 43], [363, 78]];

// left offset to fit numbers
const leftOffset = 30;

// amount days in one month
const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30];
const daysInYear = DAYS_IN_MONTHS.reduce((res,elem) => res += elem);

// ideal parameters
const width =  leftOffset + daysInYear * 2 + 10;
const height = 160;


// verticalField = full height of svg - bottom offset - space above largest num
const verticalField = 160 - 30 - 10;

const translateCoords = coords => {
    return coords.map(elem => {
        return [+elem[0]*2 + leftOffset, (verticalField + 10) - verticalField/80*(+elem[1])];
    })
};

const coordsToPath = coords => {
    let result = ``;
    result += `M${coords[0][0]},${coords[0][1]} `;
    for (let i = 1; i < coords.length; i++) {
        result += `L${coords[i][0]},${coords[i][1]} `;
    }
    return result;
};

class Chart extends Component {
    state = {
        x: 0,
        y: 0,
        showInfoCard: false
    };

    mousemoveHandler = (e) => {
        const newState = {...this.state};
        newState.x = e.clientX;
        newState.y = e.clientY;
        newState.showInfoCard = true;
        this.setState(newState);
    };

    mouseleaveHandler = (e) => {
        const newState = {...this.state};
        newState.showInfoCard = false;
        this.setState(newState);
    }

    render() {
        const verticalHeader = [80, 60, 40, 20, 0];
        // const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        let scaleWidth = 0;

        const yScaleItems = verticalHeader.map((elem, i) => {
            return (
                <text key={elem} x='0' y={10 + leftOffset * i} className='y-scale__item'>{elem}</text>
            )
        });
        const linesIntoChart = verticalHeader.map((elem, i) => {
            return (
                <line key={elem} x1={leftOffset} y1={10 + leftOffset * i} x2={width} y2={10 + leftOffset * i} style={{stroke: 'lightgrey', strokeWidth: 1}} strokeDasharray='2' />
            )
        });
        const xScaleItems = months.map((elem, i) => {
            scaleWidth += DAYS_IN_MONTHS[i] * 2;
            return (
                <text key={elem} x={leftOffset + scaleWidth - (DAYS_IN_MONTHS[0] * 2)} y='150' className='x-scale__item'>{elem}</text>
            )
        });
        const infoCard = this.state.showInfoCard ? <InfoCard date='25.01.2017' currValue='57,43' x={this.state.x} y={this.state.y} currency='$' lastCurrValue='43,9'/> : null;
        return (
            <div className='chart-wrapper'>
                {infoCard}
                <svg width={width} height={height} onMouseMove={this.mousemoveHandler} onMouseLeave={this.mouseleaveHandler}>
                    <g className='y-scale'>
                        {yScaleItems}
                    </g>
                    <g className='x-scale'>
                        {xScaleItems}
                    </g>
                    <g className='chart-lines'>
                        {linesIntoChart}
                    </g>
                    <g className='chart'>
                        <path d={coordsToPath(translateCoords(COORDS))} stroke='#2d8ae8' strokeWidth='2' fill='transparent'/>
                        <g>
                            <line x1='80' y1='40' x2='80' y2='130' style={{stroke: 'lightgrey', strokeWidth: 1}} strokeDasharray='2' />
                            <circle cx='80' cy='40' r='3' stroke='#fff' strokeWidth='2' fill='#2d8ae8' />
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default Chart;