import _ from 'lodash';
import minimist from 'minimist';
import { validate } from 'jsonschema';
import { Observable } from 'rxjs';
import log from '../../log';

const parseArgs = stream => stream.map(minimist);

const discoverSubCommand = stream => stream
    .map(args => ({
        command: args._[0] || '',
        params: _.extend(args, {
            _: args._.slice(1),
        }),
    }));

const isValidRequest = schema => request => validate(request.params, { properties: schema }).valid;
const grabRequestParams = subCommandSpec => stream => stream
    .map(request => _.extend(request, {
        params: _.pick(request.params, _.keys(subCommandSpec)),
    }));

const validRequestsThrough = subCommandSpec => stream => stream
    .filter(isValidRequest(subCommandSpec))
    .let(grabRequestParams(subCommandSpec));

const incompleteRequestsFinish = subCommandSpec => stream => stream
    .filter(_.negate(isValidRequest(subCommandSpec)))
    .map(() => ({ error: 'roar' }));

const validateRequest = (services) => stream => stream
    .mergeMap(params => Observable
        .merge(
            Observable.of(params)
                .let(validRequestsThrough(services[params.command] || {})),
            Observable.of(params)
                .let(incompleteRequestsFinish(services[params.command] || {})),
        ),
    );

export default (programSpecs = {}) =>
    processArgs => Observable
        .of(processArgs)
        .let(parseArgs)
        .do(log.section('Parsed Args'))
        .let(discoverSubCommand)
        .do(log.section('Sub-Command'))
        .let(validateRequest(programSpecs))
        .do(log.section('Validated Request'));
