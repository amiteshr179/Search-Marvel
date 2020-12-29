import React from 'react';
import CommonDisplay from '../CommonDisplay/CommonDisplay';
import '../CommonDisplay/CommonDisplay.css';
const StoriesList = ({stats}) =>{
    return(
        <div className='list'>
            <h2>"Stories"</h2>
            {
                stats.map(item =><CommonDisplay stats={item}/>)
            }

        </div>
    )
}
export default StoriesList;
