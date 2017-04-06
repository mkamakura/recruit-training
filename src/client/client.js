import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { useAsyncLoader } from 'redux-async-loader';
import { syncHistoryWithStore } from 'react-router-redux';
import Fetchr from 'fetchr';
import createStore from '../shared/redux/createStore';
import getRoutes from '../shared/routes';

const clientConfig = {
  fetchr: {
    xhrPath: 'http://localhost:3001/api',
    xhrTimeout: 1000000,
    context: {},
    contextPicker: {
      GET: [],
    },
  },
};

const store = createStore({}, {
  fetchr: new Fetchr(clientConfig.fetchr),
  logger: process.env.NODE_ENV === 'development',
  history: browserHistory,
  devTools: __DEVELOPMENT__,
});

const history = syncHistoryWithStore(browserHistory, store);
const routes = getRoutes(store);

const RenderWithMiddleware = applyRouterMiddleware (
  useAsyncLoader(),
);

const content = (
  <Provider store={store} key="provider">
    <Router history={history} render={(props) => <RenderWithMiddleware {...props} />}>
      {routes}
    </Router>
  </Provider>
);
render(content, document.getElementById('root'));
