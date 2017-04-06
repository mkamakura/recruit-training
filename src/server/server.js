import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import debugFactory from 'debug';
import config from './configs';
import { apiGateway } from './middlewares';

const debug = debugFactory('app:server:main');

const corsOptions = {
  origin: 'http://localhost:3000',
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
app.use(config.clientConfig.fetchr.xhrPath, cors(corsOptions), apiGateway(config));

app.use((req, res) => {
  res.status(404).send('Not found');
});

debug('Creating http server');
const server = http.createServer(app);

const port = +(process.env.PORT || 3000);
app.listen(port, () => {
  debug(`Listening on port ${port}`);
});

export default server;
