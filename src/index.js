#! /usr/bin/env node

import _ from 'lodash';
import minimist from 'minimist';
import { Observable, Subject } from 'rx';
import log from './log';

const parseArgs = stream => stream.map(minimist);

const discoverSubCommand = stream => stream
    .map(args => ({
        command: args._[0] || '',
        params: _.extend(args, {
            _: args._.slice(1),
        }),
    }));

const isValidRequest = spec => () => true;
const grabRequestParams = subCommandSpec => stream => stream
    .map(request => _.extend(request, {
        params: _.pick(request.params, _.keys(subCommandSpec.properties)),
    }));

const validateSpec = subCommandSpec => stream => stream
    .filter(isValidRequest(subCommandSpec))
    .let(grabRequestParams(subCommandSpec));

const validateRequest = ({ services = {}}) => stream => stream
    .mergeMap(params => Observable
        .of(params)
        .let(validateSpec(services[params.command] || {}))
    );

const commandParser = (programSpecs = {}) =>
    processArgs => Observable
        .of(processArgs)
        .let(parseArgs)
        .do(log('Parsed Args'))
        .let(discoverSubCommand)
        .do(log('Sub-Command'))
        .let(validateRequest(programSpecs))
        .do(log('Validated Request'));

Observable
    .of(process.argv.slice(2))
    .do(log('raw args'))
    .mergeMap(commandParser({
        services: {
            init: {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "definitions": {},
                "id": "http://example.com/example.json",
                "properties": {
                    "name": {
                        "id": "/properties/name",
                        "type": "string"
                    }
                },
                "required": [
                    "name"
                ],
                "type": "object"
            },
        },
    }))
    .subscribe(log('result'));
