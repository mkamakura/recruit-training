import { createAction, handleActions } from 'redux-actions';
import { compose } from 'recompose';
import { steps } from 'redux-effects-steps';
import { fetchrRead } from 'redux-effects-fetchr';
import { initialState, filterActionType } from './utils';

/**
 * Action types
 */
const COUNTER = 'react-redux-standard-2016/counter/';
export const COUNTER_INCREMENT = COUNTER + 'INCREMENT';
export const COUNTER_DECREMENT = COUNTER + 'DECREMENT';
export const COUNTER_RESET = COUNTER + 'RESET';

export const COUNTER_INITIALIZE = COUNTER + 'INITIALIZE/';
export const COUNTER_INITIALIZE_REQUEST = COUNTER_INITIALIZE + 'REQUEST';
export const COUNTER_INITIALIZE_SUCCESS = COUNTER_INITIALIZE + 'SUCCESS';
export const COUNTER_INITIALIZE_FAIL = COUNTER_INITIALIZE + 'FAIL';

/**
 * Action creators
 */
export const increment = createAction(COUNTER_INCREMENT);
export const decrement = createAction(COUNTER_DECREMENT);
export const reset = createAction(COUNTER_RESET);

const initializeRequest = createAction(COUNTER_INITIALIZE_REQUEST);
const initializeSuccess = createAction(COUNTER_INITIALIZE_SUCCESS);
const initializeFail = createAction(COUNTER_INITIALIZE_FAIL);

export function initialize() {
  return steps(
    initializeRequest(),
    fetchrRead('counter'),
    [initializeSuccess, initializeFail],
  )
}

/**
 * Initial state
 */
const INITIAL_STATE = {
  value: 0,
};


/**
 * Reducer
 */
export default compose(
  initialState(INITIAL_STATE),
  filterActionType(COUNTER),
)(handleActions({
  [COUNTER_INITIALIZE_SUCCESS]: (state, { payload: {data} }) => {
    return {
      value: data.value,
    }
  },
  [COUNTER_INITIALIZE_FAIL] : () => INITIAL_STATE,
  [COUNTER_INCREMENT]: (state) => ({value: state.value + 1}),
  [COUNTER_DECREMENT]: (state) => ({value: state.value - 1}),
  [COUNTER_RESET]: (state) => INITIAL_STATE,
}));