import express from 'express';
import bodyParser = require('body-parser');
import mongoose from 'mongoose';
import IController from 'interfaces/controller';

export class App {
    private app: express.Application;
    private port: number;
    public mongoUrl: string = 'mongodb://localhost/trans';

    constructor(controllers: IController[], port: number){
        this.port = port;
        this.app = express();
        this.initializeMiddleware();
        this.initializeControllers(controllers)
        this.mongoSetup();
    }

    public listen(){
        this.app.listen(this.port, ()=>{
            console.log('Express server listening on port' + this.port)
        })
    }

    private initializeMiddleware() : void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}))
    }

    private initializeControllers(controllers : IController[]){
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        });
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);    
    }
}