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
      bio: result.bio,
      profileUrl: result.html_url,
      thumbnail: result.avatar_url,
      username: result.login
    }
  }

  private handleError(error: any): any {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
