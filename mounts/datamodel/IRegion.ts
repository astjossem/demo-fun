export interface IRegion {
    fips: number,
    name: string,
    type: number,
    popCurrent?: number,
    oldPop?: number[],
    election?: number[]
}