#! /usr/bin/env node

import stm from 'commander';
import project from '../package';

stm.version(project.version);

// Commands for STM
stm.command('init')
    .description('Setup a project managed by STM.')
    .action(() => console.log('hello'))

stm.parse(process.argv);
