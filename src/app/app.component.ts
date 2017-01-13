import { Component, OnInit } from '@angular/core';

import { AppGitHubService } from './app-github.service';

import { Activity } from './Models/Activity';
import { Repo } from './Models/Repo';
import { User } from './Models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activities: Array<Activity>;
  repos: Array<Repo>;
  user: User;

  private username: string = 'github';

  constructor(private appService: AppGitHubService) {}

  ngOnInit() {
    this.loadNewUserInfo(this.username);
  }

  /**
   * Requests public user information from the GitHubApi.
   */
  private loadNewUserInfo(username: string): void {
      this.appService.loadUserInfo(username)
        .subscribe(
          res => {
            this.activities = res.activities;
            this.repos = res.repos;
            this.user = res.user;
          },
          err => console.log(err)
        );
  }

}
