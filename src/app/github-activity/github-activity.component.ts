import { Component, OnInit } from '@angular/core';

import { GitHubActivityService } from './github-activity.service';

import Activity from '../Models/Activity';
//declare var $:any;

@Component({
  selector: 'github-activity',
  templateUrl: './github-activity.component.html',
  styleUrls: ['./github-activity.component.css']
})
export class GitHubActivityComponent implements OnInit {
  private activities: Activity[];

  constructor(private activityService: GitHubActivityService) { }

  ngOnInit() {
    this.getActivities('cameverett');
  }

  private getActivities(username: string): void {
    this.activityService.getActivities(username)
      .then(results => {
        this.activities = results;
      });
  }

}
