import { Component, OnInit } from '@angular/core';

import { GitHubActivityService } from './github-activity/github-activity.service';
import { GitHubRepoService } from './github-repo/github-repo.service';
import { UserProfileService } from './user-profile/user-profile.service';

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
    private activityService: GitHubActivityService,
    private repoService: GitHubRepoService,
    private userService: UserProfileService) {}

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
    this.repoService.getRepos(username)
      .then(repos => this.repos = repos);
  }
  private getUser(username: string): void {
    this.userService.getUser(username)
      .then(user => this.user = user);
  }
}
