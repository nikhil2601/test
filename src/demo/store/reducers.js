import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as auth } from 'demo/modules/auth';

export default combineReducers({
    auth,
    router: routerReducer,
});
