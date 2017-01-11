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

/**
 * Provides public user information to the AppComponent.
 */
@Injectable()
export class AppGitHubService {
    private repoByUsernameUrl = 'https://api.github.com/users/';
    private userActivitiesUrl = 'https://api.github.com/users/';
    private userProfileUrl = 'https://api.github.com/users/';

    constructor(private _http: Http) { }

    /**
     * Returns an observable receiving an array of the 
     * last 3 public events the user has been involved.
     * @param {string} username - The user's display name on GitHub.
     * @returns {Observable<Activity[]>}
     */
    getActivities(username: string): Observable<Activity[]> {
        return this._http.get(this.userActivitiesUrl + username + '/events/public?per_page=3')
            .map((res: Response) => {
                return this.mapPropsToActivityModel(res);
            })
            .catch((error: any) => {
                return Observable.throw(error) || 'Server Error.'
            })
    } 

    /**
     * Returns an observable receiving an array of at most 9 repositories 
     * that the user has interacted with on GitHub.
     * @param {string} username - The user's display name on GitHub.
     * @returns {Observable<Repo[]>}
     */
    getRepos(username: string): Observable<Repo[]> {
        return this._http.get(this.repoByUsernameUrl + username + '/repos?per_page=9')
            .map((res: Response) => {
                return this.mapPropsToRepoModel(res);
            })
            .catch((error: any) => {
                return Observable.throw(error) || 'Server Error';
            })
    }

    /**
     * Returns an observable receiving public information 
     * from a GitHub user's profile.
     * @param {string} username - The user's display name on GitHub.
     * @returns {Observable<User>}
     */
    getUser(username: string): Observable<User> {
        return this._http.get(this.userProfileUrl + username)
            .map((res: Response) => {
                return this.mapPropsToUserModel(res);
            })
            .catch((error: any) => {
                return Observable.throw(error) || 'Server Error';
            })
    }

    /**
     * Given a response from the api endpoint, return an object that
     * corresponds to the Activity interface to be displayed
     * by the GitHubActivityComponent.
     * @param {Response} response - Response received from getActivities method
     * @returns {Activity}
     */
    private mapPropsToActivityModel(response: Response): Activity {
        const results = response.json();
        
        // Allow only activities handled in the app/data-helpers/dtos.
        const filteredResults = results.filter( res => {
            return isValidActivityType(res.type);
        })
        
        // Map each result to the Activity interface.
        return filteredResults.map(event => {
            return mapToDto(event);
        });
    }

    /**
     * Given a response from the api endpoint, return an object that
     * corresponds to the Repo interface to be displayed by 
     * the GitHubRepoComponent.
     * @param {Response} response - Response received from getRepos method.
     * @returns {Repo}
     */
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

    /**
     * Given a response from the api endpoint, return an object that
     * corresponds to the User interface to be displayed 
     * by the UserProfileComponent.
     * @param {Response} response - Response received from the getUser method
     * @returns {User}
     */
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
