#! /usr/bin/env node

import stm from 'commander';
import project from '../package';

stm.version(project.version);

// Commands for STM

stm.parse(process.argv);
