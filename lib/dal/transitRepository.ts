import "reflect-metadata";
import { BaseCrudRepository, IBaseCrudRepository } from "./baseRepository";
import { Transit } from './../interfaces/transit';
import { injectable, inject } from "inversify";
import { IDbContext } from "./dbContext";
import { TYPES } from "../di/types";
import { MonthlyReportItem } from "interfaces/monthlyReportItem";

export interface ITransitRepository extends IBaseCrudRepository<Transit> {
    getFromRange(startDate: Date, EndDate: Date):Promise<MonthlyReportItem[]>;
}

@injectable()
export class TransitRepository extends BaseCrudRepository<Transit> implements ITransitRepository {
    constructor(@inject(TYPES.DbContext) dbContext: IDbContext) {
        super(dbContext);
        this.init("Transit");
    }

    public async getFromRange(startDate: Date, EndDate: Date):Promise<MonthlyReportItem[]>{
        return this.model.aggregate(
            [
                { $match: { date: { $gte: startDate, $lt: EndDate } } },
                {
                  $group: {
                    _id: "$date",
                    date: {
                      $max: "$date"
                    },
                    averagePrice: {
                      $avg: "$price"
                    },
                    averageDistance: {
                      $avg: "$distance"
                    },
                    totalDistance: {
                      $sum: "$distance"
                    }
                  }
                }
              ]
        )
    }
}