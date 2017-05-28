import _ from 'lodash';

export default function(should, Assertion) {
    Assertion.add('command', function(command, parameters = {}) {
        const parameterStringify = p => _.map(_.toPairs(p), ([k, v]) => `[${k}:${v}]`).join(', ');
        const commandText = c => _.isEmpty(c) ? 'no command' : `the command [${c}]`;
        const paramText = p => _.isEmpty(p) ? ' with no parameters' : ` with parameters ${parameterStringify(p)}`;
        this.params = {
            operator: 'to actually be',
            actual: commandText(this.obj.command) + paramText(this.obj.params),
            expected: commandText(command) + paramText(parameters),
        };
        should(this.obj.command).be.equal(command);
        should(this.obj.params).be.deepEqual(parameters);
    });
};
