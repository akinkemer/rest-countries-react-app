import React from 'react'

function Flag(props) {
    return (
        <img src={props.svgURL} className="img-thumbnail" width="64px" alt={props.countryName }/>
    )
}
export default Flag;
