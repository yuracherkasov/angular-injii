import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from './chat.service';
import { ConstantsService } from '../services/constants.service';
import { PopupService } from './../shared/services/ui-popup.service';
import { UiService } from '../shared/services/ui-service.service';
import { IMessage } from './chat.model';


@Component({
  moduleId: module.id,
  selector: 'sd-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
  providers: [ChatService]
})

export class ChatComponent implements OnInit {

  @ViewChild('messageInput') messageField: ElementRef;
  public hidepopup: boolean = false;
  public activeChat: string = 'commentary';
  public messageIsValid: boolean = true;
  public message: string;
  private messages: Array<IMessage> = [];
  private chatScrollTop: number;
  private chatUpdateInterval: number = 1000;
  private interval: any;

  constructor(
    public popupService: PopupService,
    public uiService: UiService,
    private chatService: ChatService,
    private constantsService: ConstantsService) {

    popupService.contentObservable.subscribe(data => {
      if (data) {
        this.showPopUp();
      } else {
        this.hidePopUp();
      }
    })
  }

  ngOnInit(): void {
    this.startChat();
  }

  showPopUp() {
    this.hidepopup = false;
  }

  hidePopUp() {
    this.hidepopup = true;
  }
  
  handleLoad(event: any) {
    let element = this.messageField.nativeElement;
    if (element.scrollTop > (element.scrollHeight - element.clientHeight - 100)) {
      element.scrollTop = 99999;
    }
  }

  changeChat(chat: string): void {
    this.activeChat = chat;
    this.stopChat();
    this.startChat();
  }

  validateMessage(event: any): void {
    if (this.message.split(/[\s]+/).length > 8) {
      this.messageIsValid = false;
    } else {
      this.messageIsValid = true;
    }
  }

  checkUser(): boolean {
    if (!this.constantsService.User || this.constantsService.User === null) return false;
    if (this.activeChat === 'commentary') {
      if (this.constantsService.User.role === 'artist' || this.constantsService.User.role === 'charity') {
        return true;
      }
      return false;
    }
    return true;
  }

  private getInputContainer(): any {
    return this.messageField.nativeElement;
  }


  private startChat(): void {
    this.chatService.get(this.activeChat)
      .then((response: any) => {
        this.receiveMessagess(response.data);
        this.interval = setInterval(() => {
          this.getNewMessages(this.activeChat);
        }, this.chatUpdateInterval);
      }, (reject) => {
        console.log('reject: ', reject);
      });
  }

  private stopChat(): void {
    clearInterval(this.interval);
    this.messages = [];
  }

  private getNewMessages(chatType: string): void {
    this.chatService.getNewMessages(chatType, this.messages[this.messages.length - 1].id)
      .then((response: any) => {
        this.receiveMessagess(response.data);
      },
      (reject) => {
        console.log('reject: ', reject);
      });

  }

  private receiveMessagess(message: Array<IMessage>): void {
    if (message.length && Array.isArray(message)) {
      this.messages.push(...message);
    }
  }

  private sendMessage(event: any): void {
    event.stopPropagation();

    if (!this.messageIsValid) return;

    let msg: IMessage = {
      id: null,
      user: this.constantsService.User.username || this.constantsService.User.firstname + ' ' + this.constantsService.User.lastname,
      message: this.message,
      role: this.constantsService.User.role,
      image: this.constantsService.User.avatar
    };

    this.chatService.post(this.activeChat, msg)
      .then((response: any) => {
        this.receiveMessagess(response.data);
      },
      (reject) => {
        console.log('reject: ', reject);
      });
    this.message = '';
  }

}
