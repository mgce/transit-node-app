import { Transit } from "interfaces/transit";
import "reflect-metadata";
import { Request, Response } from "express";
import { TransitModel } from "../models/transit";
import { MonthlyReportItem } from "./../interfaces/monthlyReportItem";
import {
  controller,
  httpGet,
  BaseHttpController
} from "inversify-express-utils";
import { DateHelper } from "../utils/dateHelper";
import { start } from "repl";

@controller("/reports")
export class ReportsController extends BaseHttpController {
  @httpGet("/monthly")
  public async getMonthly(req: Request, res: Response) {
    const { date } = req.query;

    const parsedDate = new Date(date);

    const startOfMonth = DateHelper.startOfMonth(parsedDate);
    const endOfMonth = DateHelper.endOfMonth(parsedDate);

    return TransitModel.aggregate([
      { $match: { date: { $gte: startOfMonth, $lt: endOfMonth } } },
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
    ])
      .then((response: MonthlyReportItem[]) => res.json(response))
      .catch(err => res.send(err));
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
