import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import Activity from './Models/Activity';
import Repo from './Models/Repo';
import User from './Models/User';

import { isValidActivityType, mapToDto } from './data-helpers/dtos/github-activity.dto';

@Injectable()
export class AppGitHubService {
    private repoByUsernameUrl = 'https://api.github.com/users/';
    private userActivitiesUrl = 'https://api.github.com/users/';
    private userProfileUrl = 'https://api.github.com/users/';

    constructor(private _http: Http) { }

    getActivities(username: string): Observable<Activity[]> {
        return this._http.get(this.userActivitiesUrl + username + '/events/public?per_page=3')
            .map((res: Response) => {
                return this.mapPropsToActivityModel(res);
            })
            .catch((error: any) => {
                return Observable.throw(error) || 'Server Error.'
            })
    } 
    getRepos(username: string): Observable<Repo[]> {
        return this._http.get(this.repoByUsernameUrl + username + '/repos?per_page=9')
            .map((res: Response) => {
                return this.mapPropsToRepoModel(res);
            })
            .catch((error: any) => {
                return Observable.throw(error) || 'Server Error';
            })
    }

    getUser(username: string): Observable<User> {
        return this._http.get(this.userProfileUrl + username)
            .map((res: Response) => {
                return this.mapPropsToUserModel(res);
            })
            .catch((error: any) => {
                return Observable.throw(error) || 'Server Error';
            })
    }

    private mapPropsToActivityModel(response: Response): Activity {
        const results = response.json();
        
        const filteredResults = results.filter( res => {
            return isValidActivityType(res.type);
        })
        
        return filteredResults.map(event => {
            return mapToDto(event);
        });
    }
    private mapPropsToRepoModel(response: Response): Repo {
        const repos = response.json();
        return repos.map(res => {
            return {
                description: res.description,
                name: res.name,
                primaryLanguage: res.language,
                url: res.html_url
            }
        })
    }

    private mapPropsToUserModel(response: Response): User {
        let result = response.json();
        return {
            bio: result.bio,
            profileUrl: result.html_url,
            thumbnail: result.avatar_url,
            username: result.login
        }
    }

}
