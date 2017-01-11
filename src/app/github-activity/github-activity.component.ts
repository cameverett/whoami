import { Component, Input } from '@angular/core';

import Activity from '../Models/Activity';

@Component({
  selector: 'github-activity',
  templateUrl: './github-activity.component.html',
  styleUrls: ['./github-activity.component.css']
})

/**
 * Handles the layout of the current array of activities
 * from the AppComponent.
 */
export class GitHubActivityComponent {
  private _activities: Array<Activity>;

  @Input()
  set activities(activities: Array<Activity>) {
    this._activities = activities;
  }

  get activities(): Array<Activity> {
    return this._activities;
  }
}
