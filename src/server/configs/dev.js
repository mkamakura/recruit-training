import path from 'path';
import ms from 'ms';

const rootDir = path.resolve(__dirname, '../../..');

export default {
  // https://github.com/expressjs/body-parser
  bodyParser: {
    // https://github.com/expressjs/body-parser#bodyparserjsonoptions
    json: {},

    // https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
    urlencoded: {
      extended: true,
    },
  },

  // https://github.com/jshttp/cookie
  cookieParser: null,

  // https://github.com/yahoo/fetchr
  fetchr: {

  },

  clientConfig: {
    // https://github.com/yahoo/fetchr
    fetchr: {
      xhrPath: '/api',
      xhrTimeout: 1000000,
      context: {},
      contextPicker: {
        GET: [],
      },
    },

    fetchrCache: {
      max: 100,
      maxAge: ms('10m'),
      excludes: [],
    },
  },

  agreed: {
    config: {
      axios: {
        baseURL: 'http://localhost:3010/',
        timeout: 10000,
      },
    },
    port: 3010,
    path: path.join(rootDir, '/agreed/agreed.js'),
  },
};
