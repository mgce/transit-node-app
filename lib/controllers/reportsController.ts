import "reflect-metadata";
import { Request, Response } from "express";
import TransitModel from "../dal/models/transit";
import {
  controller,
  httpGet,
  BaseHttpController
} from "inversify-express-utils";
import { DateHelper } from "../utils/dateHelper";
import { inject } from "inversify";
import { TYPES } from "../di/types";
import { DataPreparator } from "../interfaces/dataPreparator";

@controller("/reports")
export class ReportsController extends BaseHttpController {
  private readonly dataPreparator : DataPreparator;

  constructor(@inject(TYPES.ReportsDataPreparator) dataPreparator : DataPreparator) {
    super();
    this.dataPreparator = dataPreparator;
  }

  @httpGet("/monthly")
  public async getMonthly(req: Request, res: Response) {
    const { date } = req.query;

    const parsedDate = new Date(date);

    return await this.dataPreparator.getMonthly(parsedDate);
  }

  @httpGet("/range")
  public async getRange(req: Request, res: Response) {
    const range = req.query;

    const startDate = DateHelper.dateWithoutTime(range.startDate);
    const endDate = DateHelper.dateWithoutTime(range.endDate);

    TransitModel.aggregate([
      { $match: { date: { $gte: startDate, $lt: endDate } } },
      {
        $group: {
          _id: "$date",
          totalDistance: {
            $sum: "$distance"
          },
          totalPrice: {
            $sum: "$price"
          }
        }
      }
    ]);

    return TransitModel.find({
      date: {
        $lt: startDate,
        $gte: endDate
      }
    })
      .then(response => res.json(response))
      .catch(err => res.send(err));
  }
}
