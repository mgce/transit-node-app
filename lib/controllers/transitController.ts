import "reflect-metadata";
import { DateHelper } from './../utils/dateHelper';
import { DistanceService } from "interfaces/distanceService";
import { Response } from "express";
import { Transit } from "interfaces/transit";
import { inject } from "inversify";
import { TYPES } from "../di/types";
import { ITransitRepository } from 'dal/transitRepository';
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

  @inject(TYPES.TransitRepository)
  private transitRepository!: ITransitRepository;

  @httpPost("/")
  public async addTransit(@requestBody() dto: Transit, res: Response) {
    const transitDate = new Date(dto.date);

    dto.distance = await this.routeDistanceService.count(
      dto.sourceAddress,
      dto.destinationAddress
    );
``
    dto.date = DateHelper.dateWithoutTime(transitDate);

    // const newTransit = new TransitModel(dto);
    return this.transitRepository.create(dto)
      .then(result => {
        let response = new HttpResponseMessage(200);
        response.content = new JsonContent(result);
        return response;
      })
      .catch(err => res.send(err));
  }
}
