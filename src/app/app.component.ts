import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';
import { GitHubActivityService } from './github-activity/github-activity.service';

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

  constructor(
    private appService: AppService,
    private activityService: GitHubActivityService) {}

  ngOnInit() {
    this.getActivities(this.username);
    this.getRepositories(this.username);
    this.getUser(this.username);
  }

  private getActivities(username: string): void {
    this.activityService.getActivities(username)
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
