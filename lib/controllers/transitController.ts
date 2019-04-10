import { Request, Response } from 'express';
import { TransitModel } from '../models/transit';
import { RouteDistanceService } from '../services/routeDistanceService';
import express = require('express');
import { Transit } from 'interfaces/transit';
import IController from 'interfaces/controller';

export class TransitController implements IController {
    private path = '/transits';
    public router = express.Router();
    private routeDistanceService: RouteDistanceService;

    constructor() {
        this.initializeRoutes();
        this.routeDistanceService = new RouteDistanceService();
    }

    private initializeRoutes() {
        this.router.post(this.path, this.addTransit);
    }

    public addTransit = async (req: Request, res: Response) => {
        const transitData: Transit = req.body;
        const transitDate = new Date(transitData.date);

        transitData.distance = await this.routeDistanceService.getDistance(transitData.sourceAddress, transitData.destinationAddress);
        transitData.date = new Date(transitDate.getFullYear(),transitDate.getMonth(),transitDate.getDate())
        const newTransit = new TransitModel(transitData);
        newTransit.save().then(
            result => res.json(result),
        ).catch(err => res.send(err));
    }
}