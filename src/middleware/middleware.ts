import { error } from './util/error.util';
import { json } from 'body-parser';
import { cors } from './util/cors.util';
import { staticFiles } from './util/static.util';
import { multer_moment } from './util/multer.util';

export const middleware = [
    json(),
    cors,
    error,
    staticFiles,
    multer_moment,
]