import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import User from '../Models/User';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class UserProfileService {
  private userProfileUrl = 'https://api.github.com/users/';

  constructor(private http: Http) { }

  getUser(username: string) : Promise<User> {
    return this.http.get(this.userProfileUrl + username)
        .toPromise()
        .then(response => {
          return this.mapPropsToUserModel(response);

        })
        .catch(this.handleError);
  }

  private mapPropsToUserModel(jsonResponse): User {
    let result = jsonResponse.json();
    return {
      username: result.login,
      thumbnail: result.avatar_url,
      profileUrl: result.html_url
    }
  }

  private handleError(error: any): any {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
