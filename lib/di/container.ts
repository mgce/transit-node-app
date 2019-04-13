import "reflect-metadata";
import { Container } from "inversify";
import { DistanceService } from "../interfaces/distanceService";
import { RouteDistanceService } from "../infrastructure/routeDistanceService/routeDistanceService";
import { TYPES } from "./types";
import { ReportsDataPreparator } from "services/reportsService";
import { DataPreparator } from "interfaces/reportsDataPreparator";

const container = new Container();
container.bind<DistanceService>(TYPES.DistanceService).to(RouteDistanceService);
container.bind<DataPreparator>(TYPES.ReportsDataPreparator).to(ReportsDataPreparator);

export { container as Container };
