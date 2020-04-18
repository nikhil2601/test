import _get from 'lodash/get';
import { createSelector } from 'reselect';

export const getPersist = state => _get(state, '_persist', {});

export const isStateHydrated = createSelector([getPersist], persist =>
    _get(persist, 'rehydrated', false)
);
