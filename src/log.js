import chalk from 'chalk';
import winston from 'winston';

winston.level = 'debug';
if (process.env.NODE_ENV === 'test') winston.level = null;

winston.section = section =>
    properties => winston.log(
        'debug',
        `${chalk.green.bold(section)} ${chalk.cyan(JSON.stringify(properties, null, 4))}`
    );

export default winston;
