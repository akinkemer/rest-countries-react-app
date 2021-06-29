import React from 'react'

function Flag(props) {
    return (
        <div className="justify-content-center text-center">
            <img src={props.svgURL} className="img-thumbnail" width="64px" alt={props.countryName }/>
        </div>
    )
}
export default Flag;
