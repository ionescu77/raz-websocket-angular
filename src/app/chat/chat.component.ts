import { Component, OnInit } from '@angular/core';
import { SocketService } from '../_services/socket.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: string[] = [];
  msgControl = new FormControl('');
  destroyed$ = new Subject();

  constructor(private chatService: SocketService) { }

  ngOnInit(): void {
      console.log("chat ngOnInit")
    const chatSub$ = this.chatService.connect().pipe(
      takeUntil(this.destroyed$),
    );

    chatSub$.subscribe(message => this.messages.push(message));
  }

  sendMessage(): void {
    this.chatService.send(this.msgControl.value);
    this.msgControl.setValue('');
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

}
