import React from 'react'

export default (props) => (
    <div className="step">
        <img src={props.image} alt={props.alt}/>
        <h4>{props.topic}</h4>
        <p>{props.content}</p>
    </div>
)