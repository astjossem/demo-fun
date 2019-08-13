import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CensusApiService } from 'src/app/services/census-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public message = '';
  public send = '';
  public states: any[];

  constructor(private readonly messageService: MessageService,
              private readonly censusApiService: CensusApiService) { }

  public async ngOnInit(): Promise<void> {
    this.message = await this.messageService.getIntro();
    await this.getAllStates();

  }

  public async sendMessage(): Promise<void> {
    const message = await this.messageService.sendMessage(this.send);
  }

  public async getAllStates(): Promise<void> {
    this.states = await this.censusApiService.getAllStates();
    console.log(this.states);
  }

}
