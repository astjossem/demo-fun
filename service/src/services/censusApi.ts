import * as rp from 'request-promise-native';
import config from '../../../config.json';
import { IRegion } from '../../../datamodel/IRegion';
import { RegionType } from '../../../datamodel/regionType';

class CensusApiService {

    public async getAllStateCurrentPop(): Promise<IRegion[]> {
        const states: IRegion[] = []
        const result = await this.getPop(config.baseUri, [config.currentQuery], config.key);
        const priorPop = await this.getPop(config.baseUri, config.queries, config.key);
        console.log(result);
        console.log(priorPop);
        result.map((state: any) => {
            if (state[0] !== 'GEONAME') {
                const oldPop: number[] = [];
                states.push({
                    fips: state[2],
                    name: state[0],
                    type: RegionType.state,
                    popCurrent: state[1],
                    oldPop
                });
            }
        }); 
        return states;
    }

    public async getPop(baseUri: string, query: string[], key?: string): Promise<any[]> {
        const pop: any[] = [];
        for (const q of query) {
            pop.push(JSON.parse((await rp.get(baseUri + q + key, { resolveWithFullResponse: true})).body));
        }
        return pop;
    }

    public findState(fips: number, popArray: []): number {
        return popArray.find((ele: any) => {
            return ele[1] === fips;
        });
    }
}

export const censusApiService = new CensusApiService;
