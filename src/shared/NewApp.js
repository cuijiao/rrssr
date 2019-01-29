import React from 'react';
import { Link } from 'react-router';

class NewApp extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/todos">Todos</Link>
                    </li>
                    <li>
                        <Link to="/posts">Posts</Link>
                    </li>
                </ul>

                {this.props.children}
            </div>
        );
    }
}

export default NewApp
