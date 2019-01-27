import Home from './Home';
import Posts from './posts';
import Todos from './todos';
import NotFound from './NotFound';

import { loadData } from './api';

const Routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/posts',
        component: Posts,
        loadData: () => loadData('posts')
    },
    {
        path: '/todos',
        component: Todos,
        loadData: () => loadData('todos')
    },
    {
        component: NotFound
    }
];

export default Routes;