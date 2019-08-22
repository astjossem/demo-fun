import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegion } from '../../../../datamodel/IRegion';

const server = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class CensusApiService {

  constructor(private readonly httpClient: HttpClient) { }

  public async getAllStates(): Promise<IRegion[]> {
    return this.httpClient.get<any[]>(`${server}/states`).toPromise();
  }
}
