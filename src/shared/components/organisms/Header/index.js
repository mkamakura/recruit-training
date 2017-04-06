import React, { Component } from 'react';
import { compose, pure } from 'recompose';
import { IndexLink, Link } from 'react-router';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  pure,
)(class Header extends Component {
  render(props = this.props) {
    return (
      <header className={local('root')}>
        <h1 className={local('title')}>recruit-training</h1>
      </header>
    );
  }
});
