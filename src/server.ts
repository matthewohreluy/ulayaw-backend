import { routes } from './routes/routes';
import { App } from './application';
import { middleware } from './middleware/middleware';
import * as dotenv from "dotenv";

const currentEnvironment = 'dev'

dotenv.config({path: `src/environment/${currentEnvironment}/.env`});

const port: number = 8080 || process.env.port;
const db_uri: string = process.env.MONGODB_URI!;

const app = new App(
    port,
    middleware,
    routes
)



app.mongoDB(db_uri, (_response)=>{
    console.log('Conenction Successful!');
    app.listen();
});

