import { routes } from './routes/routes';
import { App } from './application';
import { middleware } from './middleware/middleware';
import * as dotenv from "dotenv";

const currentEnvironment = 'dev'

dotenv.config({path: `src/environment/${currentEnvironment}/.env`});

const port: number | any = process.env.PORT || 8080;
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

