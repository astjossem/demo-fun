export interface IRegion {
    _id?: string,
    fips: number,
    name: string,
    type: number,
    popCurrent?: number,
    oldPop?: number[]
}