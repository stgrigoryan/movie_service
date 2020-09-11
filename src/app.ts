import express from 'express';

import routes from './routes';
import './db/client';
import config from './config';

const app = express();

app.use('/', routes);

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});

app.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
