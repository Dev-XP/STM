#! /usr/bin/env node

import stm from 'commander';
import indent from 'indent-string';
import project from '../package';

stm
    .version(project.version)
    .help((text) => {
        console.log(indent(`

STM is a project management system.
        `, 4));
        return indent(text, 2);
    });

// Commands for STM
stm.command('init')
    .description('Setup a project managed by STM.')
    .action(() => console.log('hello'))

stm.parse(process.argv);
