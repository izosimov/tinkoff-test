import React, { Component } from 'react';
import './Chart.css';
import InfoCard from './InfoCard/InfoCard.js';


// left offset to fit numbers
const LEFT_OFFSET = 30;
// bottom offset to fit month names
const BOTTOM_OFFSET = 30;
const SPACE_BETWEEN_Y_BREAKPOINTS = 30;


// amount days in one month
const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30];
const DAYS_IN_YEAR = DAYS_IN_MONTHS.reduce((res,elem) => res + elem);

const UNITS_PER_POINT = 2;

// ideal parameters
const width = LEFT_OFFSET + DAYS_IN_YEAR * UNITS_PER_POINT + 10;
const height = 160;


// verticalField = full height of svg - bottom offset - space above largest num
const verticalField = height - BOTTOM_OFFSET - 10;

// translate coordinates to svg points
const _translateCoord = (coord, maxYValue) => {
    return [+coord[0] * UNITS_PER_POINT + LEFT_OFFSET, (verticalField + 10) - verticalField/maxYValue*(+coord[1])]
};

const translateCoords = (coords, maxYValue) => {
    return coords.map(elem => _translateCoord(elem, maxYValue))
};

// generate 'd' attr of path svg
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
        showInfoCard: false,
        maxYValue: null,
        spaceBetweenYBreakpoints: 30,
    };

    // when mouse is on chart we need to get the nearest data point using binary search
    _getNearestXPoint = data => {
        var guess,
            min = 0,
            max = data.length - 1,
            xCoord = this.state.x - LEFT_OFFSET;

        while(min - max !== 1){
            guess = Math.floor((min + max) / 2);

            if(data[guess][0] * UNITS_PER_POINT === xCoord)
                return guess;
            else if(data[guess][0] * UNITS_PER_POINT < xCoord)
                min = guess + 1;
            else
                max = guess - 1;
        }

        // This could happen when we are on the first element
        if (data[min - 1] === undefined) {
            return min;
            // This could happen when we are on the fast element
        } else if (data[min] === undefined) {
            return min - 1;
        } else if (xCoord - data[min - 1][0] * UNITS_PER_POINT < data[min][0] * UNITS_PER_POINT - xCoord) {
            return min - 1;
        }
        return min;
    };

    componentDidMount() {
        let max = 0;
        this.props.data.forEach(elem => {
            if (elem[1] > max) {
                max = elem[1];
            }
        });
        const crutchVerticalField = Math.ceil(verticalField/SPACE_BETWEEN_Y_BREAKPOINTS) * SPACE_BETWEEN_Y_BREAKPOINTS
        const sections = Math.ceil(crutchVerticalField / SPACE_BETWEEN_Y_BREAKPOINTS);
        const separator = Math.ceil(max / sections / 10) * 10;
        this.setState({
            ...this.state,
            sections: sections,
            separator: separator,
            maxYValue: separator * sections,
        });
    }

    mousemoveHandler = e => {
        const rect = this.refs.svgChart.getBoundingClientRect();
        const svgWindowLeftOffset = rect.x;
        const svgWindowTopOffset = rect.y;
        const newState = {...this.state};
        newState.x = e.clientX - svgWindowLeftOffset;
        newState.y = e.clientY - svgWindowTopOffset;
        newState.showInfoCard = true;
        this.setState(newState);
    };

    mouseleaveHandler = e => {
        const newState = {...this.state};
        newState.showInfoCard = false;
        this.setState(newState);
    };

    render() {
        if (this.state.maxYValue === null) return null;
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const monthsWidth = [41,49,30,41,22,30,31,38,55,47,43,50];

        const yScaleItems = [];
        const linesIntoChart = [];
        // Line amount should be section amount + 1 (i <= section instead of i < section)
        for (let i = 0; i <= this.state.sections; i++) {
            // FIXME: generate key that does not depend on 'i'
            yScaleItems.push(
                <text key={this.state.separator * i} x='0' y={10 + LEFT_OFFSET * (this.state.sections - i)} className='y-scale__item'>{this.state.separator * i}</text>
            );

            // FIXME: generate key that does not depend on 'i'
            linesIntoChart.push(
                <line key={this.state.separator * i} x1={LEFT_OFFSET} y1={10 + this.state.spaceBetweenYBreakpoints * i} x2={width} y2={10 + this.state.spaceBetweenYBreakpoints * i} style={{stroke: 'lightgrey', strokeWidth: 1}} strokeDasharray='2' />
            )
        }

        let daysOffset = LEFT_OFFSET;
        const xScaleItems = months.map((elem, i) => {
            if (i !== 0) {
                daysOffset += DAYS_IN_MONTHS[i] * UNITS_PER_POINT;
            }
            return (
                <text key={elem} x={daysOffset + (DAYS_IN_MONTHS[i] * UNITS_PER_POINT / 2) - (monthsWidth[i] / 2)} y={height - 10} className='x-scale__item'>{elem}</text>
            )
        });

        // index of dot in svg chart
        const dotIndex = this._getNearestXPoint(this.props.data);
        // translate value to coordinates
        const translatedDot = _translateCoord(this.props.data[dotIndex], this.state.maxYValue);
        let infoCard = null;
        if (this.state.showInfoCard) {
            infoCard = (<InfoCard
                days={this.props.data[dotIndex][0]}
                currValue={this.props.data[dotIndex][1]}
                currency='$'
                lastCurrValue={dotIndex !== 0 ? this.props.data[dotIndex - 1][1] : this.props.data[dotIndex][1]}
                x={translatedDot[0]}
                y={translatedDot[1]}
            />);
        }
        return (
            <div className='chart-wrapper'>
                {infoCard}
                <svg ref="svgChart" width={width} height={height} onMouseMove={this.mousemoveHandler} onMouseLeave={this.mouseleaveHandler}>
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
                        <path d={coordsToPath(translateCoords(this.props.data, this.state.maxYValue))} stroke='#2d8ae8' strokeWidth='2' fill='transparent'/>
                        <g>
                            <line x1={translatedDot[0]} y1={translatedDot[1]} x2={translatedDot[0]} y2={height - this.state.spaceBetweenYBreakpoints} style={{stroke: 'lightgrey', strokeWidth: 1}} strokeDasharray='2' />
                            <circle cx={translatedDot[0]} cy={translatedDot[1]} r='3' stroke='#fff' strokeWidth='2' fill='#2d8ae8' />
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default Chart;