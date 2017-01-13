import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/forkJoin';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

import { Activity } from './Models/Activity';
import { Repo } from './Models/Repo';
import { User } from './Models/User';

import { isValidActivityType, mapToDto } from './data-helpers/dtos/github-activity.dto';

/**
 * Provides public user information to the AppComponent.
 */
@Injectable()
export class AppGitHubService {
    private baseUrl: string = 'https://api.github.com/users';

    constructor(private _http: Http) {}

    loadUserInfo(username: string): Observable<any> {
        return Observable.forkJoin(
            this.getActivities(username),
            this.getRepos(username),
            this.getUser(username)
        )
        .map(res => {
            return {
                activities: res[0],
                repos: res[1],
                user: res[2],
            }
        });
    }

    /**
     * Returns an observable receiving an array of the 
     * last 3 public events the user has been involved.
     * @param {string} username - The user's display name on GitHub.
     * @returns {Observable<Array<Activity>>}
     */
    getActivities(username: string): Observable<Array<Activity>> {
        let params = new URLSearchParams();
        params.set('per_page', '3');

        return this._http.get(
            `${this.baseUrl}/${username}/events/public`,
            {
                search: params
            })
            .retry(1)
            .map((res: Response) => {
                const results = res.json();
                const filteredActivities = results.filter(
                    activity => { return isValidActivityType(activity.type); }
                );
                return filteredActivities.map(
                    event => {
                        return mapToDto(event);
                    }
                );
            })
            .catch((error: any) => {
                return Observable.throw(error) || 'Server Error.';
            });
    }

    /**
     * Returns an observable receiving an array of at most 9 repositories 
     * that the user has interacted with on GitHub.
     * @param {string} username - The user's display name on GitHub.
     * @returns {Observable<Array<Repo>>}
     */
    getRepos(username: string): Observable<Array<Repo>> {
        let params = new URLSearchParams();
        params.set('per_page', '9');

        return this._http.get(
            `${this.baseUrl}/${username}/repos`,
            {
                search: params
            })
            .retry(1)
            .map((res: Response) => {
                const repos = res.json();

                return repos.map((repo) => {
                    return {
                        description: repo.description,
                        name: repo.name,
                        primaryLanguage: repo.language,
                        url: repo.html_url
                    };
                });
            })
            .catch((error: any) => {
                return Observable.throw(error) || 'Server Error';
            });
    }

    /**
     * Returns an observable receiving public information 
     * from a GitHub user's profile.
     * @param {string} username - The user's display name on GitHub.
     * @returns {Observable<User>}
     */
    getUser(username: string): Observable<User> {
        return this._http.get(`${this.baseUrl}/${username}`)
            .retry(1)
            .map((res: Response) => {
                const userInfo = res.json();
                return {
                    bio: userInfo.bio,
                    profileUrl: userInfo.html_url,
                    thumbnail: userInfo.avatar_url,
                    username: userInfo.login
                };
            })
            .catch((error: any) => {
                return Observable.throw(error) || 'Server Error';
            });
    }

}
