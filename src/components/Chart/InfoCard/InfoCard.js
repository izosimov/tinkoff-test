import React from 'react';
import './InfoCard.css'

const dynamicObj = {
    down: '▼',
    up: '▲'
};

const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30];

const getDate = daysNumber => {
    if (daysNumber > 366 || daysNumber < 1) return null;
    let days = 0;
    let month;
    let day;
    for (let i = 0; i < DAYS_IN_MONTHS.length; i++) {
        if (daysNumber - days < DAYS_IN_MONTHS[i]) {
            if (daysNumber - days === 0) {
                day = DAYS_IN_MONTHS[i-1];
                month = i - 1;
            } else {
                month = i;
                day = daysNumber - days;
            }
            break;
        }
        days += DAYS_IN_MONTHS[i];
    }
    return `${day < 10 ? "0" : ""}${day}.${month + 1 < 10 ? "0" : ""}${month + 1}.2015`
};

const InfoCard = props => {
    const currDynamic = props.currValue > props.lastCurrValue;

    return (
        <div className='info-card' style={{position: 'absolute', top: `${+props.y - 55}px`, left: `${+props.x + 20}px`}}>
            <p className='info-card__date'>{getDate(+props.days)}</p>
            <div className='info-card__currency-rate'>
                <span className='info-card__currency'>{props.currency}</span>
                <p className='info-card__currency-value'>{props.currValue}</p>
                <div className='info-card__currency-dynamic-wrap'>
                    <span className={`info-card__currency-dynamic info-card__currency-dynamic${currDynamic ? "_up" : "_down"}`}>
                        {currDynamic ? dynamicObj.up : dynamicObj.down}
                    </span>
                    <p className={`info-card__currency-dynamic info-card__currency-dynamic${currDynamic ? "_up" : "_down"}`}>
                        {currDynamic ? props.currValue - props.lastCurrValue : props.lastCurrValue - props.currValue}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;

