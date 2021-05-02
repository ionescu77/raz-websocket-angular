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
    // this.chatService.send(this.msgControl.value);
    console.log(this.msgControl.value);
    var str = this.msgControl.value;
    console.log(str);
    this.chatService.send(str);
    console.log("Sent: " + this.msgControl.value);
    // var myArr = new Uint8Array(str.length);
    //
    // for(var i = 0; i < Object.keys(str).length; i++){
    //     // console.log(i);
    //     console.log("Index value: "+ i +" has a byte code of: " + str.charCodeAt(i) + " for the char: " + str.charAt(i));
    //     this.chatService.send(str.charCodeAt(i));
    //     myArr[i] = str.charCodeAt(i);
    // };
    // console.log(myArr);
    // console.log(myArr[1]);
    this.msgControl.setValue('');

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

}
