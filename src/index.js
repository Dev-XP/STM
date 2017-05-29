#! /usr/bin/env node

import { Observable } from 'rxjs';
import log from './log';
import commandParser from './modules/command-parser';

const services = {
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
};

const requestSchema = {
    blog: { b: { type: 'string' } },
    test: { test: { type: 'string' } },
    stuff: { roar: { type: 'string' } },
};

Observable
    .of(process.argv.slice(2))
    .do(log.section('Raw Args'))
    .mergeMap(commandParser(requestSchema))
    .subscribe(log.section('Result'));
