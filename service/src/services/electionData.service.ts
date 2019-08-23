import results from '../../../../data/statePresidential.json';

class ElectionDataService {

    public stateResults(fips: number): any {
        const years: number[] = [];
        years.push(this.electionResults(2016, fips));
        years.push(this.electionResults(2012, fips));
        years.push(this.electionResults(2008, fips));
        return years;
    }

    private electionResults(year: number, fips: number): any {
        const dem = results.find((item) => {
            item.year === year && item.party === 'democrat' && item.state_fips === fips;
        });
        const rep = results.find((item) => {
            item.year === year && item.party === 'republican' && item.state_fips === fips;
        });

        return rep.candidatevotes - dem.candidatevotes;
    }
}

export const electionDataService = new ElectionDataService();