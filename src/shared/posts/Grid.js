import React, { Component } from 'react'

const Grid = ({ posts }) => {
    return (
        <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
            {posts.map(({ id, title, body }) => (
                <li key={id} style={{ margin: 30 }}>
                    <ul>
                        <li>{title}</li>
                        <li>{body} stars</li>
                    </ul>
                </li>
            ))}
        </ul>
    )
};

export default Grid
