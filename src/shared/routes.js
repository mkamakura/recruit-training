import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/organisms/App';
import DefaultLayout from './components/templates/DefaultLayout';
import Header from './components/organisms/Header';
import Main from './components/organisms/Main';
import Footer from './components/organisms/Footer';
import Counter from './components/organisms/Counter';

export default function getRoutes(store) {
  return (
    <Route path="/" component={App}>
      <Route component={DefaultLayout}>
        <Route components={{ header: Header, main: Main, footer: Footer }}>
          <IndexRoute component={Counter} />
        </Route>
      </Route>
    </Route>
  );
}
