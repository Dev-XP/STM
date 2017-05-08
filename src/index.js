#! /usr/bin/env node

import _ from 'lodash';
import { Observable } from 'rxjs';
import minimist from 'minimist';
import log from './log';

const parseArgs = stream => stream.map(minimist);
const discoverSubCommand = stream => stream
    .map(args => ({
        command: args._[0] || '',
        params: _.extend(args, {
            _: args._.slice(1),
        }),
    }));

const commandParser = (programSpecs = {}) =>
    processArgs => Observable
        .of(processArgs)
        .let(parseArgs)
        .do(log('parsed args'))
        .let(discoverSubCommand)
        .do(log('sub-command'));

Observable
    .of(process.argv.slice(2))
    .do(log('raw args'))
    .mergeMap(commandParser())
    .subscribe(log('result'));
