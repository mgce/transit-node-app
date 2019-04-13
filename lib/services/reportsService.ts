import { DateHelper } from "utils/dateHelper";
import { TransitModel } from "models/transit";
import { MonthlyReportItem } from "interfaces/monthlyReportItem";
import { DataPreparator } from "interfaces/reportsDataPreparator";

export class ReportsDataPreparator implements DataPreparator {
    public async getMonthly(date: Date) : Promise<MonthlyReportItem[]>{
        const startOfMonth = DateHelper.startOfMonth(date);
        const endOfMonth = DateHelper.endOfMonth(date);

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
          ]);
    }
}