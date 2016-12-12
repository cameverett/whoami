import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import Activity from '../Models/Activity';
import 'rxjs/add/operator/toPromise';

import { isValidActivityType, mapToDto } from '../data-helpers/dtos/github-activity.dto';

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
    const results = resource.json();

    const filteredResults = results.filter( res => {
      return isValidActivityType(res.type);
    })

    return filteredResults.map(event => {
      return mapToDto(event);
    });
  }



  private handleError(error: any): any {
    console.error('An error occured <GitHubActivityService>', error);
    return (error.message || error);
  }
}
