import "reflect-metadata";
import fs from 'fs';
import path from 'path';
import { Schema, Model } from 'mongoose';
import { injectable } from "inversify";

interface DbContextItem {
    name: string,
    schema: any
}

export interface IDbContext{
    getModel(name: string) : Model<any>
}

@injectable()
export class DbContext implements IDbContext{
    private readonly models: DbContextItem[];

    constructor(){
        this.models = this.loadModels();
    }

    public getModel(name: string) : Model<any> {
        const modelName = name.toLocaleLowerCase();
        const dbContextItem = this.models.find(m => m.name === modelName + ".ts" ||m.name === modelName + ".js");
        if(dbContextItem)
            return dbContextItem.schema.default;
        throw new Error('Model does not exist: ' + name);
    }

    private loadModels() : DbContextItem[]{
        const models : DbContextItem[] = [];
        const modelDir = path.join(__dirname, "models"); 

        fs.readdirSync(modelDir).forEach(fileName =>{
            const schema = require('./models/' + fileName)
            const dbContextItem : DbContextItem = {
                name: fileName.toLocaleLowerCase(),
                schema
            };
            models.push(dbContextItem);
        })

        return models;
    }
}