import "reflect-metadata";
import express from 'express';
import bodyParser = require('body-parser');
import mongoose from 'mongoose';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';

export class App {
    private app: express.Application;
    private port: number;
    public mongoUrl: string = 'mongodb://localhost/trans';
    private server: InversifyExpressServer;

    constructor(container: Container, port: number){
        this.port = port;
        this.server = new InversifyExpressServer(container);
        this.initializeServer();
        this.mongoSetup();
        this.app = this.server.build()
    }

    private initializeServer(){
        this.server.setConfig((app)=>{
            this.initializeMiddleware(app);
        })
    }

    public listen(){
        this.app.listen(this.port, ()=>{
            console.log('Express server listening on port' + this.port)
        })
    }

    private initializeMiddleware(app: express.Application) : void{
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}))
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);    
    }
}