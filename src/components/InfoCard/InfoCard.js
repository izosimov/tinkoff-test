import React from 'react';
import './InfoCard.css'

const dynamicObj = {
    down: '▼',
    up: '▲'
};
let currDynamic = null;

const InfoCard = (props) => {
    currDynamic = props.currValue > props.lastCurrValue ? dynamicObj.up : dynamicObj.down;

    return (
        <div className='info-card' style={{position: 'absolute', top: `${+props.y - 60}px`, left: `${+props.x + 20}px`}}>
            <p className='info-card__date'>{props.date}</p>
            <div className='info-card__currency-rate'>
                <span className='info-card__currency'>{props.currency}</span>
                <p className='info-card__currency-value'>{props.currValue}</p>
                <div className='info-card__currency-dynamic-wrap'>
                    <span className='info-card__currency-dynamic info-card__currency-dynamic_up'>{currDynamic}</span>
                    <p className='info-card__currency-dynamic info-card__currency-dynamic_up'>5,51</p>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;

