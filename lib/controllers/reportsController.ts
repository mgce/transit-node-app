import "reflect-metadata";
import { Request, Response } from "express";
import { TransitModel } from "../models/transit";
import { MonthlyReportItem } from "./../interfaces/monthlyReportItem";
import { controller, httpGet, BaseHttpController } from "inversify-express-utils";

@controller("/reports")
export class ReportsController extends BaseHttpController {

  @httpGet("/monthly")
  public async getMonthly(req: Request, res: Response) {
    const { date } = req.query;

    const parsedDate = new Date(date);

    const startOfMonth = new Date(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      parsedDate.getFullYear(),
      parsedDate.getMonth() + 1,
      0
    );

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

  public getRange = async (req: Request, res: Response) => {
    const range = req.body;
  };
}
