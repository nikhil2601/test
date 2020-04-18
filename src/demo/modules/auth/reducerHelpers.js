import _get from 'lodash/get';
import getTime from 'date-fns/get_time';

export const fetchTokenSuccess = (state, action) => {
    const token = _get(action, 'payload.data', {});

    return {
        ...state,
        token: {
            ...token,
            // Add a new property to the auth.token,
            // fetched_at, indicating the timestamp when
            // the token was last fetched.
            fetched_at: getTime(new Date()),
        },
    };
};

export const logout = (state = {}, action) => {
    const { token, ...newState } = state;
    return newState;
};
