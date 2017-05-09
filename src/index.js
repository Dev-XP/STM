#! /usr/bin/env node

import { Observable } from 'rx';
import log from './log';
import commandParser from './modules/command-parser';

Observable
    .of(process.argv.slice(2))
    .do(log('Raw Args'))
    .mergeMap(commandParser({
        services: {
            init: {
                request: {
                    schema: {
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
            },
        },
    }))
    .subscribe(log('Result'));
