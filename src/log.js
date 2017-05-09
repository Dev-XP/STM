import chalk from 'chalk';
import winston from 'winston';

winston.level = 'debug';

winston.section = section =>
    properties => winston.log(
        'debug',
        `${chalk.green.bold(section)} ${chalk.cyan(JSON.stringify(properties, null, 4))}`
    );

export default winston;
