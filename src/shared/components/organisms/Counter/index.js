import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { deferLoader } from 'redux-async-loader';
import { increment, decrement, reset, initialize } from '../../../redux/modules/counter';
import CounterButtons from '../../molcules/CounterButtons';
import bindActionCreators from '../../utils/bindActionCreators';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

function getResultValueClass(value) {
  return value < 0 ? local('result_minus') : local('result_plus');
}

export default compose(
  deferLoader((props, { dispatch }) => dispatch(initialize())),
  connect(
    (state) => ({
      counterValue: state.counter.value,
    }),
    bindActionCreators({
      increment,
      decrement,
      reset,
    }),
  ),
  onlyUpdateForPropTypes,
  setPropTypes({
    counterValue: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }),
)(class Counter extends Component {
  render(props = this.props) {
    const { counterValue, increment, decrement, reset } = props;

    return (
      <div className={local('root')}>
        <h2 className='pageTitle'>Counter</h2>
        <CounterButtons increment={increment} decrement={decrement} reset={reset} />
        <div className={local('result')}>value: <span className={getResultValueClass(counterValue)}>{counterValue}</span></div>
      </div>
    );
  }
});
