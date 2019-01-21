import React, { Component } from 'react'
import Grid from './Grid'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Grid repos={this.props.data} />
            </div>
        )
    };
}
