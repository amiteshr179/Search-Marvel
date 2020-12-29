import React from 'react';
import CommonDisplay from '../CommonDisplay/CommonDisplay';
import '../CommonDisplay/CommonDisplay.css';
const SeriesList = ({stats}) =>{
    return(
        <div className='list'>
            <h2>"Series"</h2>
            {
                stats.map(item =><CommonDisplay stats={item}/>)
            }

        </div>
    )
}
export default SeriesList;
