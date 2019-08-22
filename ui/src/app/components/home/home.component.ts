import { Component, OnInit } from '@angular/core';
import { CensusApiService } from '../../services/census-api.service';
import { IRegion } from '../../../../../datamodel/IRegion';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public states: IRegion[];
  public displayedColumns = ['name', 'current', 'ten', 'zero', 'ninety'];
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

}
