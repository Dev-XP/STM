#! /usr/bin/env node

import _ from 'lodash';
import minimist from 'minimist';
import { Observable, Subject } from 'rx';
import log from './log';

const isValidRequest = spec => () => true;

const validateSpec = subCommandSpec => stream => stream
    .filter(isValidRequest(subCommandSpec));

const parseArgs = stream => stream.map(minimist);

const discoverSubCommand = stream => stream
    .map(args => ({
        command: args._[0] || '',
        params: _.extend(args, {
            _: args._.slice(1),
        }),
    }));

const validateRequest = stream => stream
    .mergeMap(params => Observable
        .of(params)
        .let(validateSpec(params))
    );

const commandParser = (programSpecs = {}) =>
    processArgs => Observable
        .of(processArgs)
        .let(parseArgs)
        .do(log('Parsed Args'))
        .let(discoverSubCommand)
        .do(log('Sub-Command'))
        .let(validateRequest)
        .do(log('Validated Request'));

Observable
    .of(process.argv.slice(2))
    .do(log('raw args'))
    .mergeMap(commandParser())
    .subscribe(log('result'));
