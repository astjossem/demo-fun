import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public message = '';

  constructor(private readonly messageService: MessageService) { }

  public async ngOnInit(): Promise<void> {
    this.message = await this.messageService.getIntro();
  }

}
