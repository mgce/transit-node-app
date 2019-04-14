import "reflect-metadata";
import { Container } from "inversify";
import { DistanceService } from "../interfaces/distanceService";
import { RouteDistanceService } from "../infrastructure/routeDistanceService/routeDistanceService";
import { TYPES } from "./types";
import { ReportsDataPreparator } from "../services/reportsDataPreparator";
import { DataPreparator } from "../interfaces/dataPreparator";
import { IDbContext, DbContext } from "../dal/dbContext";
import { ITransitRepository, TransitRepository } from "../dal/transitRepository";

const container = new Container();
container.bind<DistanceService>(TYPES.DistanceService).to(RouteDistanceService);
container.bind<DataPreparator>(TYPES.ReportsDataPreparator).to(ReportsDataPreparator);
container.bind<IDbContext>(TYPES.DbContext).to(DbContext).inSingletonScope();
container.bind<ITransitRepository>(TYPES.TransitRepository).to(TransitRepository);

export { container as Container };
