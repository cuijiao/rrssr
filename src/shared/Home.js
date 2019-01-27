import React from 'react';

export default ({ staticContext = {} }) => {
    return <h1>This is homepage! {staticContext.status} </h1>;
};