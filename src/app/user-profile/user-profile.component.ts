import { Component, Input } from '@angular/core';

import User from '../Models/User';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  private _user: User;

  @Input()
  set user(user: User) {
    this._user = user
  }

  get user(): User {
    return this._user;
  }
}
