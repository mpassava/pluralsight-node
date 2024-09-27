import express from 'express';
import chalk from 'chalk';
import debugModule from 'debug';
import morgan from 'morgan';

const debug = debugModule('app');
const app = express();

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(3000, () => {
  debug(`listening on port ${chalk.green('3000')}`);
});
