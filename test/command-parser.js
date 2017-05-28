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

    it('should recognize a single command with no parameters using [{{given}}]', ex => ex
        .givenEach([
            'blog',
            'roar',
            'test',
            'blog -ab roar -t',
            'test --test roar',
            'stuff --roar test',
        ])
        .when(command => Observable
            .of(command.split(' '))
            .mergeMap(commandParser())
        )
        .thenEach(
            (result, expected) => result.should.be.command(expected),
            ['blog', 'roar', 'test', 'blog', 'test', 'stuff'],
        )
    );
});
