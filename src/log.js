import chalk from 'chalk';

export default section =>
    properties =>
        console.log(
            chalk.green.bold(section),
            chalk.cyan(JSON.stringify(properties, null, 4)),
        );
