import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    classes: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  }),
)(class Button extends Component {
  render(props = this.props) {
    const { classes, children, onClick } = props;

    return (
        <div className={local(...classes)} onClick={onClick}>
          {children}
        </div>
    );
  }
});
