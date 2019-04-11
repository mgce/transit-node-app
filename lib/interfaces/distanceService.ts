export interface DistanceService{
    count(sourceAddress: string, destinationAddress: string) : Promise<number>
}