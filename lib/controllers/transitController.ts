import { DateHelper } from './../utils/dateHelper';
import "reflect-metadata";
import { DistanceService } from "interfaces/distanceService";
import { Request, Response } from "express";
import { TransitModel } from "../models/transit";
import { Transit } from "interfaces/transit";
import { inject } from "inversify";
import { TYPES } from "../di/types";
import {
  controller,
  httpPost,
  BaseHttpController,
  requestBody,
  HttpResponseMessage,
  JsonContent
} from "inversify-express-utils";

@controller("/transits")
export class TransitController extends BaseHttpController {
  @inject(TYPES.DistanceService)
  private routeDistanceService!: DistanceService;

  @httpPost("/")
  public async addTransit(@requestBody() dto: Transit, res: Response) {
    const transitDate = new Date(dto.date);

    dto.distance = await this.routeDistanceService.count(
      dto.sourceAddress,
      dto.destinationAddress
    );

    dto.date = DateHelper.dateWithoutTime(transitDate);

    const newTransit = new TransitModel(dto);
    return newTransit
      .save()
      .then(result => {
        let response = new HttpResponseMessage(200);
        response.content = new JsonContent(result);
        return response;
      })
      .catch(err => res.send(err));
  }
}
