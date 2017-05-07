#! /usr/bin/env node

import { Observable } from 'rxjs';

Observable
    .of(process.argv.slice(2))
    .do(console.log)
    .subscribe(console.log);
