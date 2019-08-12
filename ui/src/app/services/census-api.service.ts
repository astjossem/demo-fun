import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const server = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class CensusApiService {

  constructor(private readonly httpClient: HttpClient) { }

  public async getAllStates(): Promise<any[]> {
    return this.httpClient.get<any[]>(`${server}/states`).toPromise();
  }
}
