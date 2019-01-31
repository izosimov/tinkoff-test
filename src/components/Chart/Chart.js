import React, {Component} from 'react';
import './Chart.css';

// coords = [day, dollarValue]
const COORDS = [[0, 65], [10, 60], [20, 70], [30, 50], [40, 50], [50, 30], [60, 35], [70, 70]];

// left offset to fit numbers
const leftOffset = 30;

// bottom offset to fit numbers
const bottomOffset = 30;

// full height of svg - bottom offset - space above largest num
const verticalField = 160 - 30 - 10;

const translateCoords = coords => {
    return coords.map(elem => {
        return [+elem[0] + leftOffset, (verticalField + 10) - verticalField/80*(+elem[1])];
    })
}

const coordsToPath = coords => {
    let result = "";
    result += `M${coords[0][0]},${coords[0][1]} `;
    for (let i = 1; i < coords.length; i++) {
        result += `L${coords[i][0]},${coords[i][1]} `;
    }
    return result;
}

class Chart extends Component {
    render() {
        console.log(coordsToPath(translateCoords(COORDS)))
        const verticalHeader = [80, 60, 40, 20, 0];
        const horizontalHeader = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const yScaleItems = verticalHeader.map((elem, i) => {
            return (
                <text key={elem} x='0' y={10 + leftOffset * i} className='y-scale__item'>{elem}</text>
            )
        });
        const xScaleItems = horizontalHeader.map((elem, i) => {
            return (
                <text key={elem} x={30 + bottomOffset * i} y='150' className='x-scale__item'>{elem}</text>
            )
        });
        return (
            <div className='chart-wrapper'>
                <svg width='400' height='160'>
                    <g className='y-scale'>
                        {yScaleItems}
                    </g>
                    <g>
                        <line x1='30' y1='10' x2='400' y2='10' style={{stroke: 'lightgrey', strokeWidth: 1}} strokeDasharray='2' />
                        <line x1='30' y1='40' x2='400' y2='40' style={{stroke: 'lightgrey', strokeWidth: 1}} strokeDasharray='2' />
                        <line x1='30' y1='70' x2='400' y2='70' style={{stroke: 'lightgrey', strokeWidth: 1}} strokeDasharray='2' />
                        <line x1='30' y1='100' x2='400' y2='100' style={{stroke: 'lightgrey', strokeWidth: 1}} strokeDasharray='2' />
                        <line x1='30' y1='130' x2='400' y2='130' style={{stroke: 'lightgrey', strokeWidth: 1}} strokeDasharray='2' />
                    </g>
                    <g className='chart'>
                        <path d={coordsToPath(translateCoords(COORDS))} stroke='black' fill='transparent'/>
                    </g>
                    <g className='x-scale'>
                        {xScaleItems}
                    </g>
                </svg>
                {/*<div className='ordinate-container'>*/}

                    {/*<div className='chart'>*/}
                        {/*<svg viewBox='0 0 365 100' height='300'>*/}
                            {/*<polyline*/}
                                {/*fill='none'*/}
                                {/*stroke='blue'*/}
                                {/*strokeWidth='1'*/}
                                {/*points={this.props.points}*/}
                            {/*/>*/}
                        {/*</svg>*/}
                    {/*</div>*/}
                {/*</div>*/}
                {/*<div className='month-scale'>*/}
                    {/*<text  className='month-scale__item'>Январь</text>*/}
                    {/*<text textAnchor='middle' className='month-scale__item'>Февраль</text>*/}
                    {/*<text textAnchor='middle' className='month-scale__item'>Март</text>*/}
                    {/*<text textAnchor='middle' className='month-scale__item'>Апрель</text>*/}
                    {/*<text textAnchor='middle' className='month-scale__item'>Май</text>*/}
                    {/*<text textAnchor='middle' className='month-scale__item'>Июнь</text>*/}
                    {/*<text textAnchor='middle' className='month-scale__item'>Июль</text>*/}
                    {/*<text textAnchor='middle' className='month-scale__item'>Август</text>*/}
                    {/*<text textAnchor='middle' className='month-scale__item'>Сентябрь</text>*/}
                    {/*<text textAnchor='middle' className='month-scale__item'>Октябрь</text>*/}
                    {/*<text textAnchor='middle' className='month-scale__item'>Ноябрь</text>*/}
                    {/*<text textAnchor='middle' className='month-scale__item'>Декабрь</text>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default Chart;