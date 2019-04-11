export class RouteDistanceInput {
  private waypoints: any[];
  private distanceUnit: string;

  constructor(adresses: string[]) {
    this.distanceUnit = "Kilometers";
    this.waypoints = [];
    adresses.forEach(adress => {
      this.waypoints.push({
        address: adress
      });
    });
  }
}
