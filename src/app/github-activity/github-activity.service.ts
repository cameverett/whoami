import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import Activity from '../Models/Activity';
import 'rxjs/add/operator/toPromise';

import GitHubActivityDto, { mapToDto } from '../data-helpers/dtos/github-activity.dto';

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
      return mapToDto(event);
    });
  }

  private handleError(error: any): any {
    console.error('An error occured <GitHubActivityService>', error);
    return (error.message || error);
  }
}

/*

GET response
  2 TYPES I'M WORRIED ABOUT

  Determine by the type attribute
    which model to users and
    how to render the component in the app

    Create some Data Transfer Object to map any model to the view
    => I always want to render a message
    => I always want to render a repository name
    => I always want to render a ref / target branch

*/
