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

  constructor(private _userService: UserInfoService) {
    this._userService.activities$.subscribe(
      activities => this.activities = activities
    );

    this._userService.repos$.subscribe(
      repos => this.repos = repos
    );

    this._userService.user$.subscribe(
      user => this.user = user
    );
  }

  /**
   * Requests public user information from the GitHubApi.
   */
  private loadNewUserInfo(username: string): void {
    this._userService.loadNewUserInfo(username);
  }

}
