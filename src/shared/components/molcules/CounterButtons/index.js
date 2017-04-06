import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import Button from '../../atoms/Button';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }),
)(class CounterButtons extends Component {
  render(props = this.props) {
    const { increment, decrement, reset } = props;

    return (
      <div className={local('root')}>
        <Button classes={['button', 'button_normal']} onClick={increment}>+</Button>
        <Button classes={['button', 'button_normal']} onClick={decrement}>-</Button>
        <Button classes={['button', 'button_reset']} onClick={reset}>reset</Button>
      </div>
    );
  }
});
