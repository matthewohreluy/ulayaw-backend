import { error } from './util/error.util';
import { json } from 'body-parser';
import { cors } from './util/cors.util';

export const middleware = [
    json(),
    cors,
    error
]