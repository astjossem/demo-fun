import * as rp from 'request-promise-native';
import config from '../../../config.json';
import { IRegion } from '../../../datamodel/IRegion';
import { RegionType } from '../../../datamodel/regionType';
import { electionDataService } from './electionData.service';

class CensusApiService {

    public async getStatePop(): Promise<IRegion[]> {
        const states: IRegion[] = []
        const result = (await this.getPop(config.baseUri, [config.currentQuery], config.key))[0];
        const priorPop = await this.getPop(config.baseUri, config.queries, config.key);
        result.map((state: any) => {
            if (state[0] !== 'GEONAME') {
                const election = electionDataService.stateResults(state.name);
                const oldPop: number[] = [];
                for (const year of priorPop) {
                    const oldState = this.findState(state[2], year);
                    if (oldState) {
                        oldPop.push(oldState[0]);
                    }
                }
                states.push({
                    fips: state[2],
                    name: state[0],
                    type: RegionType.state,
                    popCurrent: state[1],
                    oldPop,
                    election
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

    public findState(fips: number, popArray: []): any[] {
        return popArray.find((ele: any) => {
            return ele[1] === fips;
        });
    }
}

export const censusApiService = new CensusApiService;
