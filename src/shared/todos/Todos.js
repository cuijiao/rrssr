import React from 'react';
import { loadData } from '../api';
import Grid from './Grid'

class Todos extends React.Component {
    constructor(props) {
        super(props);

        if (props.staticContext && props.staticContext.data) {
            this.state = {
                data: props.staticContext.data
            };
        } else {
            this.state = {
                data: []
            };
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if (window.__INITIAL_DATA__) {
                this.setState({
                    data: window.__INITIAL_DATA__
                });
                delete window.__INITIAL_DATA__;
            } else {
                loadData('todos').then(data => {
                    this.setState({
                        data
                    });
                });
            }
        }, 0);
    }

    render() {
        return <div><Grid todos={this.state.data}/></div>;
    }
}

export default Todos;