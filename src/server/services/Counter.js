import debugFactory from 'debug';
import BaseService from './BaseService';

const debug = debugFactory('app:server:services:counter');

export default class Counter extends BaseService {

  constructor(config) {
    super(config.agreed.config, 'counter', '/counter')
  }

  read(req, resource, params, config) {
    return super.read(req, resource, params, config);
  }
}
