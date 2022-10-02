import { error } from './util/error.util';
import { json } from 'body-parser';
import { cors } from './util/cors.util';
import { staticFiles } from './util/static.util';

export const middleware = [
    json(),
    cors,
    error,
    staticFiles
]