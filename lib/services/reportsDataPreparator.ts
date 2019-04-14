import "reflect-metadata";
import { DateHelper } from "../utils/dateHelper";
import { MonthlyReportItem } from "../interfaces/monthlyReportItem";
import { DataPreparator } from "../interfaces/dataPreparator";
import { injectable, inject } from "inversify";
import { TYPES } from "../di/types";
import { ITransitRepository } from "dal/transitRepository";

@injectable()
export class ReportsDataPreparator implements DataPreparator {

    private readonly transitRepository: ITransitRepository;

    constructor(@inject(TYPES.TransitRepository)transitRepository: ITransitRepository){
      this.transitRepository = transitRepository;
    }

    public async getMonthly(date: Date) : Promise<MonthlyReportItem[]>{
        const startOfMonth = DateHelper.startOfMonth(date);
        const endOfMonth = DateHelper.endOfMonth(date);

        return this.transitRepository.getFromRange(startOfMonth, endOfMonth);
    }
}