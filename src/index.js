#! /usr/bin/env node

import _ from 'lodash';
import stm from 'commander';
import indent from 'indent-string';
import unindent from 'strip-indent';
import { Observable } from 'rxjs';
import project from '../package';

const services = [
    {
        name: 'init',
        description: 'Setup a project managed by STM.',
    },
];

const programObservable = Observable.create((observer) => {
    stm.version(project.version);
    services.map(s => stm
        .command(s.name)
        .description(s.description)
        .action((command, options) => {
            observer.next({
                command: command.name(),
                options: command.args,
            });
            observer.complete();
        })
    );
    stm.parse(process.argv);

    observer.next({})
    observer.complete();
});

const help$ = programObservable
    .filter(_.isEmpty)
    .do(() => stm
        .help((text) => {
            console.log();
            console.log(indent(unindent(`
                STM is a project management system.
            `), 4));
            return text;
        })
    );

const services$ = programObservable
    .filter(_.negate(_.isEmpty))
    .do(s => console.log(`Running ${s.command} service.`));

Observable.merge(
    help$,
    services$,
).subscribe();
