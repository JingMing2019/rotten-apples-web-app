import React from 'react'
import Rating from '@mui/material/Rating';

const RatingStar = ({value}) => {

    return (
            <Rating
                name="read-only"
                value={Math.floor(value)}
                readOnly
            />
    )
}

// Rating.defaultProps = {
//     color: '#78c2ad'
// }

export default RatingStar;