import express, { Application, Router } from "express";
import mongoose, { mongo } from "mongoose";

export class App{
    public app!: Application;

    constructor(
        private port: number,
        middleware: Array<any>,
        routes: [string,Router][]
    ) {
        this.app = express();
        this.middleware(middleware);
        this.routes(routes);
    }

    private middleware(mware: any[]){
        mware.forEach((m)=>{
            this.app.use(m);
        })
    }    

    private routes(routes: [string,Router][]){
        routes.forEach((r) => {
            this.app.use(r[0],r[1]);
        });
    }

    public addMiddleWare(mware: any){
        this.app.use(mware);
    }

    public mongoDB(uri: string, callback: (response: any)=> void){
        console.log('establishing database connection...');
          mongoose
            .connect(uri)
            .then(result => callback(result))
            .catch(err => callback(err))

        // mongoose.connection.on("disconnected", connect)
    }


    public listen(){
        this.app.listen(this.port, ()=>{
            console.log(`App listening on PORT: ${this.port}`);
        })
    }


}