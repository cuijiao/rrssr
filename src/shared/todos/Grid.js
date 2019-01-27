import React, { Component } from 'react'

const Grid = ({ todos }) => {
    return (
        <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
            {todos.map(({ id, title}) => (
                <li key={id} style={{ margin: 30 }}>
                    {title}
                </li>
            ))}
        </ul>
    )
};

export default Grid
