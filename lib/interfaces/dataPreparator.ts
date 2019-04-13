import { MonthlyReportItem } from "./monthlyReportItem";

export interface DataPreparator {
    getMonthly: (date : Date) => Promise<MonthlyReportItem[]>
}