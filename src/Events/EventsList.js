import React from 'react';
import CommonDisplay from '../CommonDisplay/CommonDisplay';
import '../CommonDisplay/CommonDisplay.css';
const EventsList = ({stats}) =>{
    return(
        <div className='list'>
            <h2>"Events"</h2>
            {
                stats.map(item =><CommonDisplay stats={item}/>)
            }

        </div>
    )
}
export default EventsList;
