import React from 'react';
import { createStore, compose,applyMiddleware } from 'redux';
import filter from 'lodash/fp/filter';
import steps from 'redux-effects-steps';
import fetchr from 'redux-effects-fetchr';
import reducer from './modules/reducer';

export default function(initialState, options = {}) {
  const middlewares = filter(Boolean)([
    steps,
    fetchr(options.fetchr)
  ]);

  const devTools = [];
  if (__DEVELOPMENT__) {
    if (options.devTools) {
      const DevTools = require('../components/utils/DevTools').default;
      devTools.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
    }
  }

  const enhancer = compose(
    applyMiddleware(...middlewares),
    ...devTools
  );

  return createStore(reducer, initialState, enhancer);
}
