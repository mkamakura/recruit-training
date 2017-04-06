import React, { Component, PropTypes } from 'react';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';
import { createLocal } from '../../utils/localnames';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    header: PropTypes.node.isRequired,
    main: PropTypes.node.isRequired,
    footer: PropTypes.node.isRequired,
  }),
)(class DefaultLayout extends Component {
  render(props = this.props) {
    const { header, main, footer } =  props;

    return (
      <div className={local('root')}>
        <div className={local('header')}>
          {header}
        </div>
        <div className={local('main')}>
          {main}
        </div>
        <div className={local('footer')}>
          {footer}
        </div>
      </div>
    );
  }
});
