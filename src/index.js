#! /usr/bin/env node

import stm from 'commander';
import indent from 'indent-string';
import unindent from 'strip-indent';
import project from '../package';

stm
    .version(project.version);

// Commands for STM
stm.command('init')
    .description('Setup a project managed by STM.')
    .action(() => console.log('hello'));

stm.parse(process.argv);


if (stm.args.length === 0) {
    stm.help((text) => {
        console.log();
        console.log(indent(unindent(`
            STM is a project management system.
        `), 4));
        return text;
    });
}
