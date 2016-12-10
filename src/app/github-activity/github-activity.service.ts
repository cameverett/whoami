import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import Activity from '../Models/Activity';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GitHubActivityService {
  private userActivitiesUrl = 'https://api.github.com/users/';

  constructor(private http: Http) { }

  getActivities(username: string): Promise<Activity[]> {
    return this.http.get(this.userActivitiesUrl + username + '/events/public?per_page=3')
      .toPromise()
      .then(resource => {
        return this.mapPropsToActivityModel(resource);
      })
      .catch(this.handleError);
  } 

  private mapPropsToActivityModel(resource): Activity {
    let results = resource.json();
    return results.map(event => {
      return {
        type: event.type,
        ref: event.payload.ref,
        repoName: event.repo.name,
        repoUrl: event.repo.url,
        message: event.payload.commits[0].message
      };
    });
  }

  private handleError(error: any): any {
    console.error('An error occured <GitHubActivityService>', error);
    return (error.message || error);
  }
}
