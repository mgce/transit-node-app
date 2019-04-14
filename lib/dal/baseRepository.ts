import "reflect-metadata";
import { IDbContext } from './dbContext';
import { inject, injectable } from 'inversify';
import { TYPES } from '../di/types';
import { model, Model } from 'mongoose';

export interface IBaseCrudRepository<T> {
    create(obj: T): Promise<T>
}

@injectable()
export abstract class BaseCrudRepository<T> implements IBaseCrudRepository<T>{
    protected model!: Model<any>;
    @inject(TYPES.DbContext) 
    private readonly dbContext: IDbContext;

    constructor(@inject(TYPES.DbContext) dbContext: IDbContext){
        this.dbContext = dbContext;
    }

    // constructor(modelName: string) {
    //     const schema = this.dbContext.getModel(modelName);
    //     this.model = model(modelName, schema);
    // }

    protected init(modelName: string){
        this.model = this.dbContext.getModel(modelName);
        // this.model = model(modelName, schema);
    }

    public async create(obj: T): Promise<T> {
        return this.model.create(obj);
    }
}