import "reflect-metadata";
import { Container } from "inversify";
import { DistanceService } from "../interfaces/distanceService";
import { RouteDistanceService } from "../infrastructure/routeDistanceService/routeDistanceService";
import { TYPES } from "./types";

const container = new Container();
container.bind<DistanceService>(TYPES.DistanceService).to(RouteDistanceService);

export { container as Container };
