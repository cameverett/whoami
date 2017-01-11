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
    this.getUser(username);
    this.getActivities(username);
    this.getRepositories(username);
  }

  /**
   * Updates the app's array of activities to be displayed
   * by GitHubActivityComponent.
   */
  private getActivities(username: string): void {
    this.appService.getActivities(username)
      .subscribe(activities => {
        this.activities = activities;
      });
  }

  /**
   * Updates the app's array of repositories to be displayed
   * by GitHubRepoComponent.
   */
  private getRepositories(username: string): void {
    this.appService.getRepos(username)
      .subscribe(repos => {
        this.repos = repos;
      });
  }

  /**
   * Updates the app's current user to be displayed
   * by the UserProfileComponent.
   */
  private getUser(username: string): void {
    this.appService.getUser(username)
      .subscribe(user => {
        this.user = user;
      });
  }
}
