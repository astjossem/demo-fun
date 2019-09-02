import { Component, OnInit } from '@angular/core';
import { CensusApiService } from '../../services/census-api.service';
import { IRegion } from '../../../../../mounts/datamodel/IRegion';
import { MatTableDataSource } from '@angular/material';
import national from '../../../../../mounts/data/nationalPresidential.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public states: IRegion[];
    public displayedColumns = ['name', 'politicalLean', 'current', 'ten', 'zero', 'ninety'];
    public dataSource: MatTableDataSource<IRegion>;

    constructor(private readonly censusApiService: CensusApiService) { }

    public ngOnInit(): void {
        this.dataSource = new MatTableDataSource();
        this.getAllStates();
    }

    public async getAllStates(): Promise<void> {
        this.states = await this.censusApiService.getAllStates();
        this.dataSource.data = this.states;
    }

    public addCommas(pop?: number): string {
        if (pop) {
        return pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return '';
    }

    public growth(current: number, old: number): string {
        const percentage = Math.trunc(current * 1000 / old - 1000) / 10;
        return `  (${percentage.toString()}%)`;
    }

    public lean(state: IRegion): string {
        const past = state.election[2] - national[0].spread;
        const prior = state.election[1] - national[1].spread;
        const current = state.election[0] - national[2].spread;
        return (past * .15 + prior * .35 + current * .5).toFixed(1);
    }

}
