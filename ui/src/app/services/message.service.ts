import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const server = 'http://localhost:8000';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

    constructor(private readonly httpClient: HttpClient) { }

    public async getIntro(): Promise<string> {
        return this.httpClient.get<string>(`${server}/messages`).toPromise();
    }

    public async sendMessage(message: string): Promise<string> {
        return await this.httpClient.post<string>(`${server}/messages`, { words: message}).toPromise();
    }
}
