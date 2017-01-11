import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '../Models/User';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  private _user: User;

  @Output()
  newUserChangeRequest: EventEmitter<string> = new EventEmitter<string>();

  sendUserChangeRequest(username: string) {
    this.newUserChangeRequest.emit(username);
  }

  @Input()
  set user(user: User) {
    this._user = user;
  }

  get user(): User {
    return this._user;
  }
}
