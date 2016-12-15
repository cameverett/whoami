import { Component, OnInit } from '@angular/core';

import { AppGitHubService } from './app-github.service';

import Activity from './Models/Activity';
import Repo from './Models/Repo';
import User from './Models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activities: Activity[];
  repos: Repo[];
  user: User;

  private username: string = 'cameverett';

  constructor(private appService: AppGitHubService) {}

  ngOnInit() {
    this.loadNewUserInfo(this.username);
  }

  private loadNewUserInfo(username: string): void {
    this.getUser(username);
    this.getActivities(username);
    this.getRepositories(username);
    console.log('RECEIVED: ', username);
  }

  private getActivities(username: string): void {
    this.appService.getActivities(username)
      .then(activities => this.activities = activities);
  }
  private getRepositories(username: string): void {
    this.appService.getRepos(username)
      .then(repos => this.repos = repos);
  }
  private getUser(username: string): void {
    this.appService.getUser(username)
      .then(user => this.user = user);
  }
}
