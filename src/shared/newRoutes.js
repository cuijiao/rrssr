import React from 'react'
import { Route, IndexRoute } from 'react-router'
import NewApp from './NewApp';
import Home from './Home';
import Posts from './posts';
import Todos from './todos';

export default (
    <Route component={NewApp} path="/" >
        <IndexRoute component={Home}/>
        <Route path="/posts" component={Posts}/>
        <Route path="/todos" component={Todos}/>
    </Route>
)
