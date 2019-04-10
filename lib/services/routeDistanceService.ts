import axios from 'axios';

export class RouteDistanceService {
    public async getDistance(sourceAddress: string, destinationAddress: string): Promise<number> {
        const key = process.env.MAP_KEY;
        const url = "https://dev.virtualearth.net/REST/v1/Routes/Truck?key=" + key

        var data = {
            waypoints: [
                { address: sourceAddress },
                { address: destinationAddress },
            ],
            distanceUnit: "Kilometers"
        }

        return axios.post(url, data).then(response => {
            const {travelDistance} = response.data.resourceSets[0].resources[0];
            return travelDistance;
        }).catch(err => console.log(err))
    }
}