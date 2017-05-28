import { Observable } from 'rxjs';
import should from 'should';
import describe from 'rxt';
import commandAssertion from './utils/command-assertion';
import commandParser from '../src/modules/command-parser';

should.use(commandAssertion);

describe('Command Parser', (it) => {
    it('should recognize no command at all with [{{given}}]', ex => ex
        .givenEach([
            '',
            '--test roar',
            '-ab roar',
        ])
        .when(command => Observable
            .of(command.split(' '))
            .mergeMap(commandParser())
        )
        .then(result => result.should.be.command(''))
    );
});
