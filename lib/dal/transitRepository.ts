import "reflect-metadata";
import { BaseCrudRepository, IBaseCrudRepository } from "./baseRepository";
import { Transit } from './../interfaces/transit';
import { injectable, inject } from "inversify";
import { IDbContext } from "./dbContext";
import { TYPES } from "../di/types";
import { MonthlyReportItem } from "interfaces/monthlyReportItem";
import { DailyReportItem } from "interfaces/dailyReportItem";

export interface ITransitRepository extends IBaseCrudRepository<Transit> {
  getToMonthlyReport(startDate: Date, endDate: Date): Promise<MonthlyReportItem[]>;
  getToDailyRaport(startDate: Date, endDate: Date): Promise<DailyReportItem[]>;
}

@injectable()
export class TransitRepository extends BaseCrudRepository<Transit> implements ITransitRepository {
  constructor(@inject(TYPES.DbContext) dbContext: IDbContext) {
    super(dbContext);
    this.init("Transit");
  }

  public async getToMonthlyReport(startDate: Date, endDate: Date): Promise<MonthlyReportItem[]> {
    return this.model.aggregate(
      [
        { $match: { date: { '$gte': startDate, '$lt': endDate } } },
        {
          $group: {
            _id: "",
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
    ).exec()
  }

  public async getToDailyRaport(startDate: Date, endDate: Date): Promise<DailyReportItem[]> {
    return this.model.aggregate([
      { $match: { date: { $gte: startDate, $lt: endDate } } },
      {
        $group: {
          _id: "$date",
          date: "$date",
          averageDistance: {
            $avg: "$distance"
          },
          averagePrice: {
            $avg: "$price"
          }
        }
      }
    ]);
  }
}