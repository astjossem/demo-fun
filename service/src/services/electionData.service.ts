import results from '../../../data/statePresidential.json';
import national from '../../../data/nationalPresidential.json';

class ElectionDataService {

    public stateResults(name: string): any {
        const years: number[] = [];
        const fips = this.nameToFips(name);
        years.push(this.electionResults(2016, fips));
        years.push(this.electionResults(2012, fips));
        years.push(this.electionResults(2008, fips));
        return years;
    }

    private electionResults(year: number, fips: number): any {
        const dem = results.find((item) => {
            return item.year === year && item.party === 'democrat' && item.state_fips === fips;
        });
        const rep = results.find((item) => {
            return item.year === year && item.party === 'republican' && item.state_fips === fips;
        }); 
        return ((rep.candidatevotes * 100 / rep.totalvotes) - (dem.candidatevotes * 100 / dem.totalvotes)).toFixed(1);
    }

    private nameToFips(name: string): number {
        const fips = results.find((item) => {
            return item.state === name;
        });
        return fips.state_fips;
    }
}

export const electionDataService = new ElectionDataService();