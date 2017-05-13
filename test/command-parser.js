import { Observable } from 'rxjs';
import 'should';
import describe from 'rxt';
import commandParser from '../src/modules/command-parser';

describe('Command Parser', (it) => {
    it('should recognize no command at all', ex => ex
        .given('')
        .when(command => Observable
            .of(command)
            .mergeMap(commandParser())
        )
        .then(result => result.should.be.deepEqual({
            command: '',
            params: {},
        }))
    );
});
