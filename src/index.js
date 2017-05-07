#! /usr/bin/env node

import _ from 'lodash';
import { Observable } from 'rxjs';
import minimist from 'minimist';
import log from './log';

Observable
    .of(process.argv.slice(2))
    .do(log('raw args'))
    .mergeMap(processArgs => Observable
        .of(processArgs)
        .map(minimist)
        .do(log('parsed args'))
        .map(args => ({
            command: args._[0] || '',
            params: _.extend(args, {
                _: args._.slice(1),
            }),
        }))
        .do(log('sub-command'))
    )
    .subscribe(log('result'));
