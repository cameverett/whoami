import { Component, OnInit } from '@angular/core';

import { UserInfoService } from './shared/user-info.service';

import { Activity } from './Models/Activity';
import { Repo } from './Models/Repo';
import { User } from './Models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activities: Array<Activity>;
  repos: Array<Repo>;
  user: User;

  //private username: string = 'github';

  constructor(private _userService: UserInfoService) {}

  /**
   * Requests public user information from the GitHubApi.
   */
  private loadNewUserInfo(username: string): void {}

}
