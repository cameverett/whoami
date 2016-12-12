import { Component, OnInit } from '@angular/core';

import { GitHubActivityService } from './github-activity/github-activity.service';
import { GitHubRepoService } from './github-repo/github-repo.service';

import Activity from './Models/Activity';
import Repo from './Models/Repo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activities: Activity[];
  repos: Repo[];

  constructor(
    private activityService: GitHubActivityService,
    private repoService: GitHubRepoService) {}

  ngOnInit() {
    this.getActivities('cameverett');
    this.getRepositories('cameverett');
  }

  private getActivities(username: string): void {
    this.activityService.getActivities(username)
      .then(activities => this.activities = activities);
  }
  private getRepositories(username: string): void {
    this.repoService.getRepos(username)
      .then(repos => this.repos = repos);
  }
}
