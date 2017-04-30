#! /usr/bin/env node

import stm from 'commander';
import project from '../package';

stm
    .version(project.version)
    .parse(process.argv);
