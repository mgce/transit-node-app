import "reflect-metadata";
import { DistanceService } from './../../interfaces/distanceService';
import axios from 'axios';
import { RouteDistanceApiInput } from './routeDistanceApiInput';
import { injectable } from "inversify";

@injectable()
export class RouteDistanceService implements DistanceService{
    public async count(sourceAddress: string, destinationAddress: string): Promise<number> {
        const key = process.env.MAP_KEY;
        const url = "https://dev.virtualearth.net/REST/v1/Routes/Truck?key=" + key

        var input = new RouteDistanceApiInput([sourceAddress, destinationAddress])

        return axios.post(url, input).then(response => {
            const {travelDistance} = response.data.resourceSets[0].resources[0];
            return travelDistance;
        }).catch(err => console.log(err))
    }
}