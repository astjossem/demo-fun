import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private readonly httpClient: HttpClient) { }

  public async getIntro(): Promise<string> {
    return this.httpClient.get<string>('localhost:8000/messages').toPromise();
  }
}
