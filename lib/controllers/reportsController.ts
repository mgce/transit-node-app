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
import { ITransitRepository } from "dal/transitRepository";

@controller("/reports")
export class ReportsController extends BaseHttpController {
  private readonly transitRepository: ITransitRepository;

  constructor(@inject(TYPES.TransitRepository) transitRepository: ITransitRepository) {
    super();
    this.transitRepository = transitRepository;
  }

  @httpGet("/monthly")
  public async getMonthly(req: Request, res: Response) {
    const { date } = req.query;

    const parsedDate = new Date(date);

    const startOfMonth = DateHelper.startOfMonth(parsedDate);
    const endOfMonth = DateHelper.endOfMonth(parsedDate);

    return await this.transitRepository.getToMonthlyReport(startOfMonth, endOfMonth);
  }

  @httpGet("/range")
  public async getRange(req: Request, res: Response) {
    const range = req.query;

    const startDate = DateHelper.dateWithoutTime(range.startDate);
    const endDate = DateHelper.dateWithoutTime(range.endDate);

    return this.transitRepository.getToDailyRaport(startDate, endDate);
  }
}
