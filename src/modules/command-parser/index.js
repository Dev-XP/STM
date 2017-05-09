import _ from 'lodash';
import minimist from 'minimist';
import { validate } from 'jsonschema';
import { Observable } from 'rx';
import log from '../../log';

const parseArgs = stream => stream.map(minimist);

const discoverSubCommand = stream => stream
    .map(args => ({
        command: args._[0] || '',
        params: _.extend(args, {
            _: args._.slice(1),
        }),
    }));

const isValidRequest = schema => request => validate(request.params, schema).valid;
const grabRequestParams = subCommandSpec => stream => stream
    .map(request => _.extend(request, {
        params: _.pick(request.params, _.keys(subCommandSpec.properties)),
    }));

const validateRequestSchema = subCommandSpec => stream => stream
    .filter(isValidRequest(subCommandSpec.request.schema || {}))
    .let(grabRequestParams(subCommandSpec.request.schema || {}));

const validateRequest = ({ services = {}}) => stream => stream
    .mergeMap(params => Observable
        .of(params)
        .let(validateRequestSchema(services[params.command] || { request: {} }))
    );

export default (programSpecs = {}) =>
    processArgs => Observable
        .of(processArgs)
        .let(parseArgs)
        .do(log('Parsed Args'))
        .let(discoverSubCommand)
        .do(log('Sub-Command'))
        .let(validateRequest(programSpecs))
        .do(log('Validated Request'));
