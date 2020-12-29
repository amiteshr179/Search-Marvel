import React from 'react';
import CommonDisplay from '../CommonDisplay/CommonDisplay';
import '../CommonDisplay/CommonDisplay.css';
const ComicsList = ({stats}) =>{
    return(
        <div className='list'>
            <h2>"Comics"</h2>
            {
                stats.map(item =><CommonDisplay stats={item}/>)
            }

        </div>
    )
}
export default ComicsList;
