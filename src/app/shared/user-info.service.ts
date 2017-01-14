import { Injectable } from '@angular/core';
import { AppGitHubService } from './app-github.service';

import { Activity, Repo, User } from '../Models/index';

@Injectable()
export class UserInfoService {
    private activities: Array<Activity> = [];
    private repos: Array<Repo> = [];
    private user: User;

    constructor(private _http: AppGitHubService) {
        this.loadNewUserInfo('github');
        console.log(this.activities);
        console.log(this.repos);
        console.log(this.user);
    }

    public loadNewUserInfo(username?: string): void {
        this._http.loadUserInfo(username || 'github')
            .subscribe(
                res => {
                    this.activities = res.activities,
                    this.repos = res.repos,
                    this.user = res.user
                },
                err => console.log(err),
                () => {
                    console.log('BING', this.activities);
                    console.log('BING', this.repos);
                    console.log('BING', this.user);

                }
            )
    }

    public get userActivities(): Array<Activity> {
        return this.activities;
    }
    public get userRepos(): Array<Repo> {
        return this.repos;
    }
    public get userProfile(): User {
        return this.user;
    }
}