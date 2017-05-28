import _ from 'lodash';
import { Observable } from 'rxjs';
import should from 'should';
import describe from 'rxt';
import commandParser from '../src/modules/command-parser';

should.use(function(s, Assertion) {
    Assertion.add('command', function(command, parameters = {}) {
        const parameterStringify = p => _.map(_.toPairs(p), ([k, v]) => `[${k}:${v}]`).join(', ');
        const commandText = c => _.isEmpty(c) ? 'no command' : `the command [${c}]`;
        const paramText = p => _.isEmpty(p) ? ' with no parameters' : ` with parameters ${parameterStringify(p)}`;
        this.params = {
            operator: 'to actually be',
            actual: commandText(this.obj.command) + paramText(this.obj.params),
            expected: commandText(command) + paramText(parameters),
        };
        s(this.obj.command).be.equal(command);
        s(this.obj.params).be.deepEqual(parameters);
    });
});

describe('Command Parser', (it) => {
    it('should recognize no command at all', ex => ex
        .given('')
        .when(command => Observable
            .of(command)
            .mergeMap(commandParser())
        )
        .then(result => result.should.be.command(''))
    );
});
