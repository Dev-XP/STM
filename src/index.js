#! /usr/bin/env node

import { Observable } from 'rxjs';
import minimist from 'minimist';
import log from './log';

Observable
    .of(process.argv.slice(2))
    .do(log('raw args'))
    .map(minimist)
    .do(log('parsed args'))
    .subscribe(log('result'));
