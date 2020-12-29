import React from 'react';
import './CommonDisplay.css';
const CommonDisplay = (item) => {
    return(
        <div id={item.stats.name+Date.now()} className='genre'>
            <div className='describe'>
                <p>{`${item.stats.name}`}</p>
            </div>
        </div>
    )
}

export default CommonDisplay;
