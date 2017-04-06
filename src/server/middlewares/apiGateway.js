import Fetchr from 'fetchr';
import mapValues from 'lodash/fp/mapValues';
import debugFactory from 'debug';
import * as services from '../services';

const debug = debugFactory('app:server:middleware:apiGateway');

const registerServices = (config) => mapValues((Service) => {
  const service = new Service(config);
  debug(`Registering sevice: ${service.name}`);
  return Fetchr.registerService(makeServiceAdapter(service));
});

export default function apiGateway(config) {
  registerServices(config)(services);
  debug(services);
  return Fetchr.middleware();
}

function makeServiceAdapter(service) {
  const adapter = { name: service.name };

  ['read', 'delete'].forEach((method) => {
    if (service[method]) {
      adapter[method] = function (req, resource, params, config, cb) {
        service[method](req, resource, params, config).then(
          (result = {}) => {
            cb(null, result, result.meta);
          },
          (error) => {
            cb(error);
          }
        );
      };
    }
  });

  ['create', 'update'].forEach((method) => {
    if (service[method]) {
      adapter[method] = function (req, resource, params, body, config, cb) {
        service[method](req, resource, params, body, config).then(
          (result = {}) => {
            cb(null, result, result.meta);
          },
          (error) => {
            cb(error);
          }
        );
      };
    }
  });

  return adapter;
}
